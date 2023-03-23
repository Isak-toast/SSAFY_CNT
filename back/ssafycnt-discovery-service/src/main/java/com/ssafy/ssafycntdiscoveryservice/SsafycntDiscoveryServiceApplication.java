package com.ssafy.ssafycntdiscoveryservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
@EnableEurekaServer
public class SsafycntDiscoveryServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(SsafycntDiscoveryServiceApplication.class, args);
	}

}
