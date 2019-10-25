package com.recursoshumanos.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.view.InternalResourceViewResolver;
import org.springframework.web.servlet.view.UrlBasedViewResolver;
import org.springframework.web.servlet.view.tiles3.TilesConfigurer;
import org.springframework.web.servlet.view.tiles3.TilesView;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.spring4.SpringTemplateEngine;
import org.thymeleaf.templatemode.TemplateMode;
import org.thymeleaf.templateresolver.ClassLoaderTemplateResolver;
import org.thymeleaf.templateresolver.ITemplateResolver;
import org.thymeleaf.templateresolver.StringTemplateResolver;

@EnableWebMvc
@Configuration
@EnableAspectJAutoProxy(proxyTargetClass = true)
@ComponentScan(basePackages = { "com.recursoshumanos.controller" })
/**
 * Reemplaza a dispatcher-servlet.xml
 * 
 * @author ZUNINO
 *
 */
public class SpringConfig extends WebMvcConfigurerAdapter {

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler("/resources/**").addResourceLocations("/resources/");
	}

	@Override
	public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
		configurer.enable();
	}
	
	@Bean
	public InternalResourceViewResolver jspViewResolver() {
		InternalResourceViewResolver bean = new InternalResourceViewResolver();
		bean.setPrefix("/WEB-INF/jsp/");
		bean.setSuffix(".jsp");
		return bean;
	}

	@Bean(name = "multipartResolver")
	public CommonsMultipartResolver getMultipartResolver() {
		return new CommonsMultipartResolver();
	}

	@Bean(name = "messageSource")
	public ReloadableResourceBundleMessageSource getMessageSource() {
		ReloadableResourceBundleMessageSource resource = new ReloadableResourceBundleMessageSource();
		resource.setBasename("/WEB-INF/messages/messages");
		resource.setDefaultEncoding("ISO-8859-1");
		return resource;
	}

	@Bean
	public TilesConfigurer tilesConfigurer() {
		TilesConfigurer tilesConfigurer = new TilesConfigurer();
		tilesConfigurer.setDefinitions(new String[] { "/WEB-INF/defs/general.xml" });
		tilesConfigurer.setCheckRefresh(true);
		return tilesConfigurer;
	}

	@Bean(name = "tilesViewResolver")
	public ViewResolver tilesViewResolver() {
		UrlBasedViewResolver resolver = new UrlBasedViewResolver();
		resolver.setViewClass(TilesView.class);
		resolver.setOrder(1);
		return resolver;
	}

//	@Bean
//	public TemplateEngine emailTemplateEngine() {
//		final SpringTemplateEngine templateEngine = new SpringTemplateEngine();
//		// Resolver for TEXT emails
//		templateEngine.addTemplateResolver(textTemplateResolver());
//		// Resolver for HTML emails (except the editable one)
//		templateEngine.addTemplateResolver(htmlTemplateResolver());
//		// Resolver for HTML editable emails (which will be treated as a String)
//		templateEngine.addTemplateResolver(stringTemplateResolver());
//		// Message source, internationalization specific to emails
//		// templateEngine.setTemplateEngineMessageSource(emailMessageSource());
//		return templateEngine;
//	}

//	private ITemplateResolver textTemplateResolver() {
//		final ClassLoaderTemplateResolver templateResolver = new ClassLoaderTemplateResolver();
//		templateResolver.setOrder(Integer.valueOf(1));
//		templateResolver.setPrefix("/templates/mail/");
//		templateResolver.setSuffix(".html");
//		templateResolver.setTemplateMode(TemplateMode.TEXT);
//		templateResolver.setCharacterEncoding("ISO-8859-1");
//		templateResolver.setCacheable(false);
//		return templateResolver;
//	}
//
//	private ITemplateResolver htmlTemplateResolver() {
//		final ClassLoaderTemplateResolver templateResolver = new ClassLoaderTemplateResolver();
//		templateResolver.setOrder(Integer.valueOf(2));
//		templateResolver.setPrefix("/templates/mail/");
//		templateResolver.setSuffix(".html");
//		templateResolver.setTemplateMode(TemplateMode.HTML);
//		templateResolver.setCharacterEncoding("ISO-8859-1");
//		templateResolver.setCacheable(false);
//		return templateResolver;
//	}
//
//	private ITemplateResolver stringTemplateResolver() {
//		final StringTemplateResolver templateResolver = new StringTemplateResolver();
//		templateResolver.setOrder(Integer.valueOf(3));
//		// No resolvable pattern, will simply process as a String template
//		// everything not previously matched
//		templateResolver.setTemplateMode("HTML5");
//		templateResolver.setCacheable(false);
//		return templateResolver;
//	}
}
