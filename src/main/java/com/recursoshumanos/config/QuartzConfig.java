package com.recursoshumanos.config;

//package com.marina.config;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.scheduling.quartz.CronTriggerFactoryBean;
//import org.springframework.scheduling.quartz.JobDetailFactoryBean;
//import org.springframework.scheduling.quartz.SchedulerFactoryBean;
//
//import com.marina.controller.DownloadFileController;
//
//@Configuration
//public class QuartzConfig {
//	@Bean
//	public JobDetailFactoryBean jobDetailFactoryBean(){
//		JobDetailFactoryBean factory = new JobDetailFactoryBean();
//		factory.setJobClass(DownloadFileController.class);
//		return factory;	
//	}
//	@Bean
//	public CronTriggerFactoryBean cronTriggerFactoryBean(){
//		CronTriggerFactoryBean stFactory = new CronTriggerFactoryBean();
//		stFactory.setJobDetail(jobDetailFactoryBean().getObject());
//		//Job is scheduled after every 1 minute 
////		stFactory.setCronExpression("0 0/1 * 1/1 * ? *");
//		//Una vez por día a las 18hs
//		stFactory.setCronExpression("0 0 18 1/1 * ? *");
//		return stFactory;
//	}
//	@Bean
//	public SchedulerFactoryBean schedulerFactoryBean() {
//		SchedulerFactoryBean scheduler = new SchedulerFactoryBean();
//		scheduler.setTriggers(cronTriggerFactoryBean().getObject());
//		return scheduler;
//	}
//}
