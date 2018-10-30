package louis.live.client;

import com.google.common.base.Charsets;
import com.google.common.base.Strings;
import louis.live.client.config.bean.DbConfig;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.ApplicationContext;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

@SpringBootApplication
@MapperScan("louis.live.client.mapper")
public class LiveclientApplication {

    public static void main(String[] args) {
        ApplicationContext context = new SpringApplicationBuilder(LiveclientApplication.class).run(args);
//        DbConfig dbConfig = context.getBean(DbConfig.class);
//
//        while (true) {
//            System.out.print("> ");
//            String input = null;
//            try {
//                input = new BufferedReader(new InputStreamReader(System.in, Charsets.UTF_8)).readLine();
//            } catch (IOException e) {
//                e.printStackTrace();
//            }
//            if (!Strings.isNullOrEmpty(input) && input.trim().equalsIgnoreCase("quit")) {
//                System.exit(0);
//            }
//            System.out.println(dbConfig.toString());
//        }
    }

}
