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
//		 Properties prop = new Properties();
//		 InputStream input = null;
//		 try {
//		 input = new FileInputStream(Utilities.LDAP);
//		 // load a properties file
//		 prop.load(input);
//		 auth.ldapAuthentication().userSearchFilter("(sAMAccountName={0})")
//		 .userSearchBase(prop.getProperty("user-search-base")).contextSource()
//		 .url(prop.getProperty("urlSecurity")).managerDn(prop.getProperty("userdn"))
//		 .managerPassword(prop.getProperty("password"));
//		 } catch (Exception e) {
//			 System.out.println("configureGlobal");
//			 e.printStackTrace();  
//		 }

		auth.jdbcAuthentication().usersByUsernameQuery("select name, password, 1 from user where name = ?")
				.authoritiesByUsernameQuery(
						"SELECT user.name, permission.authority FROM ((marina.user_role user_role  INNER JOIN marina.user user ON (user_role.user_id = user.id))  INNER JOIN marina.role role ON (user_role.roles_id = role.id))  INNER JOIN marina.permission permission ON (permission.role_id = role.id) WHERE user.name = ?")
				.dataSource(dataSource);

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
		mappings.put("org.springframework.security.core.userdetails.UsernameNotFoundException", "/error");
		ex.setExceptionMappings(mappings);
		return ex;
	}
}
