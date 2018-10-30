package louis.live.config.liveconfigspringboot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.config.server.EnableConfigServer;

@SpringBootApplication
@EnableConfigServer
public class LiveConfigSpringbootApplication {

	public static void main(String[] args) {
		SpringApplication.run(LiveConfigSpringbootApplication.class, args);
	}
}
