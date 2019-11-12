package com.recursoshumanos.config;

import java.util.HashMap;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.ExceptionMappingAuthenticationFailureHandler;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
/**
 * Reemplaza a security.xml
 *
 * @author ZUNINO
 *
 */
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    DataSource dataSource;

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.jdbcAuthentication().usersByUsernameQuery("select name, password, enabled from user where name = ?")
                .authoritiesByUsernameQuery(
                        "SELECT user.name, permission.authority FROM ((recursoshumanos.user_role user_role  INNER JOIN recursoshumanos.user user ON (user_role.user_id = user.id))  INNER JOIN recursoshumanos.role role ON (user_role.roles_id = role.id))  INNER JOIN recursoshumanos.permission permission ON (permission.role_id = role.id) WHERE user.name = ?")
                .dataSource(dataSource).and().eraseCredentials(false);

    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests().antMatchers("/home**").access("isAuthenticated()").and().formLogin()
                .loginPage("/login").failureHandler(exceptionMappingAuthenticationFailureHandler())
                .loginProcessingUrl("/login").defaultSuccessUrl("/home", true).and().exceptionHandling()
                .accessDeniedPage("/403").and().csrf().disable();

    }

    @Bean
    ExceptionMappingAuthenticationFailureHandler exceptionMappingAuthenticationFailureHandler() {
        ExceptionMappingAuthenticationFailureHandler ex = new ExceptionMappingAuthenticationFailureHandler();
        Map<String, String> mappings = new HashMap<String, String>();
        mappings.put("org.springframework.security.authentication.CredentialsExpiredException", "/reset");
        mappings.put("org.springframework.security.authentication.LockedException", "/locked");
        mappings.put("org.springframework.security.authentication.BadCredentialsException", "/badCredentials");
        mappings.put("org.springframework.security.authentication.DisabledException", "/disabledAccount");
        mappings.put("org.springframework.security.core.userdetails.UsernameNotFoundException", "/error");
        ex.setExceptionMappings(mappings);
        return ex;
    }
}
