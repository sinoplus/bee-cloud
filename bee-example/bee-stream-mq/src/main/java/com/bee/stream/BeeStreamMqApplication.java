package com.bee.stream;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.metrics.buffering.BufferingApplicationStartup;

/**
 * SpringCloud-Stream-MQ 案例项目
 *
 */
@SpringBootApplication
public class BeeStreamMqApplication {

    public static void main(String[] args) {
        SpringApplication application = new SpringApplication(BeeStreamMqApplication.class);
        application.setApplicationStartup(new BufferingApplicationStartup(2048));
        application.run(args);
        System.out.println("(♥◠‿◠)ﾉﾞ  MQ案例模块启动成功   ლ(´ڡ`ლ)ﾞ  ");
    }

}
