package com.ssafy.ssafycntconfigservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.config.server.EnableConfigServer;

@SpringBootApplication
@EnableConfigServer
public class SsafycntConfigServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(SsafycntConfigServiceApplication.class, args);
	}

}
