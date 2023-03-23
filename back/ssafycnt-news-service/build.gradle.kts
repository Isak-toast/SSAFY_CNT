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
	maven("https://jitpack.io")
}

extra["springCloudVersion"] = "2021.0.6"

dependencies {
	implementation("org.springframework.boot:spring-boot-starter-batch")
//	implementation("org.springframework.boot:spring-boot-starter-security")
	implementation("org.springframework.boot:spring-boot-starter-web")
	implementation("org.springframework.cloud:spring-cloud-starter-netflix-eureka-client")
	compileOnly("org.projectlombok:lombok")
	developmentOnly("org.springframework.boot:spring-boot-devtools")
	runtimeOnly("com.h2database:h2")
	//MySQL
//	runtimeOnly("mysql:mysql-connector-java")
	annotationProcessor("org.projectlombok:lombok")
	testImplementation("org.springframework.boot:spring-boot-starter-test")
	testImplementation("org.springframework.batch:spring-batch-test")
//	testImplementation("org.springframework.security:spring-security-test")
	// JPA Hibernate
	implementation("org.hibernate:hibernate-entitymanager:5.3.10.Final")
	// JPA
	implementation("org.springframework.boot:spring-boot-starter-data-jpa")
	// JDBC
	implementation("org.springframework.boot:spring-boot-starter-jdbc")
	// 크롤링
	implementation("org.jsoup:jsoup:1.15.4")
	// KOMORAN 단어 분석
	implementation("com.github.shin285:KOMORAN:3.3.4")
	// H2 database
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
