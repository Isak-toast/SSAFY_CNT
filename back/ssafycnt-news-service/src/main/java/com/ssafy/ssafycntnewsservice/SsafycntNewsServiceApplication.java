package com.ssafy.ssafycntnewsservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
@EnableDiscoveryClient
public class SsafycntNewsServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(SsafycntNewsServiceApplication.class, args);

//		AnnotationConfigApplicationContext applicationContext = new AnnotationConfigApplicationContext(NewsJobConfiguration.class);
//		Job simpleJob = applicationContext.getBean("Job", Job.class);
	}
	@Bean
	public BCryptPasswordEncoder passwordEncoder(){
		return new BCryptPasswordEncoder();
	}

}
