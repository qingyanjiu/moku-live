package moku.live.client.config;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * 提供了一个可以跳过登录的过滤器
 */
public class ExtraAuthFilter extends GenericFilter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        String username = ((HttpServletRequest)request).getHeader("userName");
        String password = ((HttpServletRequest)request).getHeader("password");
        List<GrantedAuthority> l = new ArrayList();
        UsernamePasswordAuthenticationToken authRequest;
        if(username.equals("test") && password.equals("123")) {
            GrantedAuthority grantedAuthority = new GrantedAuthority() {
                @Override
                public String getAuthority() {
                    return "PASSED";
                }
            };
            l.add(grantedAuthority);
            //通过带第三个参数的构造方法来的UsernamePasswordAuthenticationToken对象的authRequest.isAuthenticated()方法返回就是true，即已经认证
            authRequest = new UsernamePasswordAuthenticationToken(username, password, l);
            //已认证的UsernamePasswordAuthenticationToken对象放入SecurityContextHolder,后面的filter就会放行
            SecurityContextHolder.getContext().setAuthentication(authRequest);
            //继续后面的过滤器链
            chain.doFilter(request, response);
        }
        else {
            //通过不带第三个参数的构造方法来的UsernamePasswordAuthenticationToken对象的authRequest.isAuthenticated()方法返回就是false，即没有认证
//            authRequest = new UsernamePasswordAuthenticationToken(username, password);
            //认证不通过，直接后面过滤器不用处理了，打印错误信息
            response.getOutputStream().write("Invalid username or password!".getBytes());
            response.getOutputStream().flush();
        }

    }

}
