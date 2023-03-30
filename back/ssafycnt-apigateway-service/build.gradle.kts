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
	implementation("org.springframework.cloud:spring-cloud-starter-gateway")
	compileOnly("org.projectlombok:lombok")
	annotationProcessor("org.projectlombok:lombok")
	testImplementation("org.springframework.boot:spring-boot-starter-test")
	implementation("org.springframework.cloud:spring-cloud-starter-netflix-eureka-client")
	implementation ("org.springframework.cloud:spring-cloud-starter-config")
	implementation ("org.springframework.cloud:spring-cloud-starter-bootstrap")
	implementation ("org.springframework.cloud:spring-cloud-starter-bus-amqp")
//    implementation 'org.springframework.cloud:spring-cloud-starter-sleuth'
//    implementation 'org.springframework.cloud:spring-cloud-starter-zipkin:2.2.3.RELEASE'
	// https://mvnrepository.com/artifact/io.micrometer/micrometer-registry-prometheus
	implementation ("org.springframework.boot:spring-boot-starter-actuator")
	// https://mvnrepository.com/artifact/org.springdoc/springdoc-openapi-ui
	implementation("org.springdoc:springdoc-openapi-ui:1.6.14")
	// https://mvnrepository.com/artifact/io.springfox/springfox-boot-starter
	implementation("io.springfox:springfox-boot-starter:3.0.0")
}

dependencyManagement {
	imports {
		mavenBom("org.springframework.cloud:spring-cloud-dependencies:${property("springCloudVersion")}")
	}
}

tasks.withType<Test> {
	useJUnitPlatform()
}
