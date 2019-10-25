//package com.recursoshumanos.config;
//
//import java.io.FileInputStream;
//import java.io.InputStream;
//import java.util.Properties;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.mail.javamail.JavaMailSender;
//import org.springframework.mail.javamail.JavaMailSenderImpl;
//
//import com.recursoshumanos.tools.Utilities;
//
//@Configuration
//public class MailConfig {
//
//	@Bean
//	public JavaMailSender javaMailService() {
//		Properties prop = new Properties();
//		InputStream input = null;	
//		try {
//			input = new FileInputStream(Utilities.MAIL_CONFIG);
//			prop.load(input);
//			JavaMailSenderImpl javaMailSender = new JavaMailSenderImpl();
//			javaMailSender.setHost(prop.getProperty("host"));
//			javaMailSender.setPort(Integer.valueOf(prop.getProperty("port")));
//			javaMailSender.setUsername(prop.getProperty("username"));
//			javaMailSender.setPassword(prop.getProperty("password"));
//			javaMailSender.setJavaMailProperties(getMailProperties(prop));
//			System.out.println("mail");
//			return javaMailSender;
//		} catch (Exception e) {
//			System.out.println("error mail: "+e.toString());
//			e.printStackTrace();  
//			return null;
//		}
//
//	}
//
//	private Properties getMailProperties(Properties prop) {
//		Properties properties = new Properties();
//		properties.setProperty("mail.transport.protocol", "smtp");
//		properties.setProperty("mail.smtp.auth", "true");
////		properties.setProperty(prop.getProperty("authentication-method"), "true");
//		properties.setProperty("mail.debug", "true");
//		return properties;
//	}
//}
