package moku.live.client;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("moku.live.client.mapper")
public class LiveclientApplication {

    public static void main(String[] args) {
        SpringApplication.run(LiveclientApplication.class, args);
    }
}
