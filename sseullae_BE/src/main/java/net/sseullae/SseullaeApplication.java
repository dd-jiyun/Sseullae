package net.sseullae;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class SseullaeApplication {

    public static void main(String[] args) {
        SpringApplication.run(SseullaeApplication.class, args);
    }

}
