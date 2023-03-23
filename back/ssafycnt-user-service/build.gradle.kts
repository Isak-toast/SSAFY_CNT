plugins {
    java
    id("org.springframework.boot") version "2.7.9"
    id("io.spring.dependency-management") version "1.0.15.RELEASE"
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
    compileOnly("org.projectlombok:lombok")
    developmentOnly("org.springframework.boot:spring-boot-devtools")
    annotationProcessor("org.projectlombok:lombok")
    testImplementation("org.springframework.boot:spring-boot-starter-test")
    // https://mvnrepository.com/artifact/com.h2database/h2
    implementation("com.h2database:h2:1.3.176")
    // https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-data-jpa
    implementation("org.springframework.boot:spring-boot-starter-data-jpa:2.7.9")
    // https://mvnrepository.com/artifact/org.modelmapper/modelmapper
    implementation("org.modelmapper:modelmapper:2.3.8")
    // https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-security
    implementation("org.springframework.boot:spring-boot-starter-security:2.7.9")


}

dependencyManagement {
    imports {
        mavenBom("org.springframework.cloud:spring-cloud-dependencies:${property("springCloudVersion")}")
    }
}

tasks.withType<Test> {
    useJUnitPlatform()
}
