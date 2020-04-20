package moku.live.client.config;

import moku.live.client.service.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * Created by user on 2017/5/11.
 */
@Configuration
@EnableWebSecurity
public class WebSecurityConfigure extends WebSecurityConfigurerAdapter implements ApplicationContextAware {

    protected ApplicationContext applicationContext;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .antMatchers("/refresh").permitAll()
                .antMatchers("/bus/**").permitAll()
                .antMatchers("/login").permitAll()
                .antMatchers("/").permitAll()
                .antMatchers("/user/add").permitAll()
                .antMatchers("/profile").permitAll()
                .antMatchers("/live/toList").permitAll()
                .antMatchers("/live/show").permitAll()
                .antMatchers("/startLive").permitAll()
                .antMatchers("/endLive").permitAll()
                .anyRequest().authenticated()
                .and()
                .csrf().disable()
                .formLogin()
                .loginPage("/login")
                .permitAll()
                .usernameParameter("userName")
                .passwordParameter("password")
                .defaultSuccessUrl("/")
//                .successHandler(loginSuccessHandler())
                .and()
                .logout()
                .logoutSuccessUrl("/login")
//                .logoutSuccessHandler(customLogoutSuccessHandler())
                .permitAll();
//        http.addFilterBefore(new ExtraFilter(authenticationManager()), UsernamePasswordAuthenticationFilter.class);
        // http.addFilterBefore(new ExtraAuthFilter(), UsernamePasswordAuthenticationFilter.class);
    }

//    @Bean
//    LoginSuccessHandler loginSuccessHandler(){
//        return new LoginSuccessHandler();
//    }
//
//    @Bean
//    CustomLogoutSuccessHandler customLogoutSuccessHandler(){
//        return new CustomLogoutSuccessHandler();
//    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(customUserDetailsService());
    }

    /**
     * 自定义UserDetailsService，从数据库中读取用户信息
     *
     * @return
     */
    @Bean
    public CustomUserDetailsService customUserDetailsService() {
        return new CustomUserDetailsService();
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        //解决静态资源被拦截的问题
        web.ignoring().antMatchers("/assets/**");
        web.ignoring().antMatchers("/webjars/**");
        web.ignoring().antMatchers("/home_page/**");
        web.ignoring().antMatchers("/home_page2/**");
        web.ignoring().antMatchers("/player/**");
        web.ignoring().antMatchers("/stylesheets/**");
    }
}