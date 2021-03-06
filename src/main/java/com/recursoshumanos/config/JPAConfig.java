package com.recursoshumanos.config;

import java.io.FileInputStream;
import java.io.InputStream;
import java.util.Properties;

import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.dao.annotation.PersistenceExceptionTranslationPostProcessor;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import com.recursoshumanos.tools.Utilities;

@Configuration
@EnableTransactionManagement 
@ComponentScan("com.marina.repository")
@EnableJpaRepositories("com.marina.repository")
/**
 * Reemplaza a applicationContext.xml
 * 
 * @author ZUNINO
 *
 */
public class JPAConfig {
//implements TransactionManagementConfigurer {

	@Bean(name = "entityManagerFactory")
	public LocalContainerEntityManagerFactoryBean entityManagerFactoryBean() {
		HibernateJpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
		vendorAdapter.setShowSql(true);
		LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();
		em.setJpaVendorAdapter(vendorAdapter);
		em.setDataSource(dataSource());
		em.setPackagesToScan(new String[] { "com.recursoshumanos.entity" });
		em.setJpaProperties(additionalProperties());
		return em;
	}

	@Bean(name = "dataSource")
	public DataSource dataSource() {
		Properties prop = new Properties();
		InputStream input = null;
		try {
//			input = new FileInputStream(Utilities.JDBC);
//			prop.load(input);
//			DriverManagerDataSource dataSource = new DriverManagerDataSource();
//			dataSource.setDriverClassName(prop.getProperty("jdbc.driverClassName"));
//			dataSource.setUrl(prop.getProperty("jdbc.url"));
//			dataSource.setUsername(prop.getProperty("jdbc.username"));
//			dataSource.setPassword(prop.getProperty("jdbc.password"));
//			System.out.println("mySql");
//			return dataSource;
			
			DriverManagerDataSource dataSource = new DriverManagerDataSource();
			dataSource.setDriverClassName("com.mysql.jdbc.Driver");
			dataSource.setUrl("jdbc:mysql://localhost:3306/recursoshumanos");
			dataSource.setUsername("root");
			dataSource.setPassword("1234");
			return dataSource;
			
		} catch (Exception e) {
			System.out.println("error mySql " +e.toString());
			e.printStackTrace();  
			return null;
		}

	}

	@Bean
	public JpaTransactionManager transactionManager(EntityManagerFactory emf) {
		JpaTransactionManager transactionManager = new JpaTransactionManager();
		transactionManager.setEntityManagerFactory(emf);
		transactionManager.setDataSource(dataSource());
		return transactionManager;
	}
	
	@Bean
	public PersistenceExceptionTranslationPostProcessor exceptionTranslation() {
		return new PersistenceExceptionTranslationPostProcessor();
	}

	Properties additionalProperties() {
		Properties properties = new Properties();
		properties.setProperty("hibernate.hbm2ddl.auto", "update");
		properties.setProperty("hibernate.dialect", "org.hibernate.dialect.MySQL5Dialect");
		return properties;
	}
}