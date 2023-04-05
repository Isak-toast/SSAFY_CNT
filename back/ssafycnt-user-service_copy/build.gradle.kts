plugins {
    java
    id("org.springframework.boot") version "2.7.9"
    id("io.spring.dependency-management") version "1.0.15.RELEASE"
    id("org.sonarqube") version "3.0"
}

group = "com.ssafy"
version = "0.0.1-SNAPSHOT"
java.sourceCompatibility = JavaVersion.VERSION_1_8

configurations {
    compileOnly {
        extendsFrom(configurations.annotationProcessor.get())
    }
}

repositories {
    mavenCentral()
}

extra["springCloudVersion"] = "2021.0.6"

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.cloud:spring-cloud-starter-netflix-eureka-client")
    implementation("org.springframework.boot:spring-boot-starter-validation")
    testImplementation("org.springframework.boot:spring-boot-starter-test")
    implementation ("org.springframework.cloud:spring-cloud-starter-config")
    implementation ("org.springframework.cloud:spring-cloud-starter-bootstrap")
    implementation ("org.springframework.cloud:spring-cloud-starter-openfeign")
    implementation ("org.springframework.cloud:spring-cloud-starter-bus-amqp")
    implementation ("org.springframework.boot:spring-boot-starter-actuator")
    developmentOnly("org.springframework.boot:spring-boot-devtools")
// https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-security
    implementation("org.springframework.boot:spring-boot-starter-security")

    compileOnly("org.projectlombok:lombok")
    annotationProcessor("org.projectlombok:lombok")
//    implementation ("org.springframework.cloud:spring-cloud-starter-circuitbreaker-resilience4j")
    implementation ("org.springframework.boot:spring-boot-starter-data-jpa")
//    implementation ("org.springframework.boot:spring-boot-starter-data-mongodb")
//    implementation ("org.springframework.boot:spring-boot-starter-data-redis")
//    implementation ("org.springframework.boot:spring-boot-starter-cache")

    // https://mvnrepository.com/artifact/com.mysql/mysql-connector-j
    implementation("com.mysql:mysql-connector-j:8.0.32")
    // https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-security
    implementation("org.modelmapper:modelmapper:3.1.1")

//    implementation("org.springdoc:springdoc-openapi-ui:1.6.15")
    // https://mvnrepository.com/artifact/io.springfox/springfox-boot-starter
//    implementation("io.springfox:springfox-boot-starter:3.0.0")
    // https://mvnrepository.com/artifact/com.h2database/h2
    implementation("com.h2database:h2:2.1.214")

}

dependencyManagement {
    imports {
        mavenBom("org.springframework.cloud:spring-cloud-dependencies:${property("springCloudVersion")}")
    }
}

tasks.withType<Test> {
    useJUnitPlatform()
}
