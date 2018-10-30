package louis.live.client.config;

import louis.live.client.config.domain.AuthenticationTokenImpl;
import louis.live.client.config.domain.SessionUser;
import louis.live.client.service.RedisService;
import louis.live.client.service.UserService;
import louis.live.client.uitls.Tools;
import louis.live.client.vo.User;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;

import java.util.Collections;
import java.util.Date;

public class AuthenticationProviderImpl implements org.springframework.security.authentication.AuthenticationProvider {

    private int expireHour;

    private UserService userService;

    private RedisService service;

    public AuthenticationProviderImpl(RedisService service,UserService userService) {
        this.service = service;
        this.userService = userService;
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String username = authentication.getPrincipal() + "";
        String password = authentication.getCredentials() + "";

        if (username == null) {
            throw new BadCredentialsException("Username not found.");
        }
        if (password == null) {
            throw new BadCredentialsException("Password not found.");
        }

        User user = new User();
        user = userService.getByName(username);
        if (user != null && user.getId() != null && Tools.encoderByMd5(password).equals(user.getPassword())) {
            SessionUser u = new SessionUser();
            u.setUsername(username);
            u.setCreated(new Date());
            AuthenticationTokenImpl auth = new AuthenticationTokenImpl(u.getUsername(), Collections.emptyList());
            auth.setAuthenticated(true);
            auth.setDetails(u);
            service.setValue(String.format("%s:%s", u.getUsername().toLowerCase(), auth.getHash()), u, true);
            return auth;
        } else {

        }
        return null;
    }

    @Override
    public boolean supports(Class<?> type) {
        return type.equals(UsernamePasswordAuthenticationToken.class);
    }

}
