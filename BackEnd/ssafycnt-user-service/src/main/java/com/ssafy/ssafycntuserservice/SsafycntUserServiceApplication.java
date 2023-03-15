package com.ssafy.ssafycntuserservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.awt.image.BandCombineOp;

@SpringBootApplication
@EnableDiscoveryClient
public class SsafycntUserServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(SsafycntUserServiceApplication.class, args);
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
}
