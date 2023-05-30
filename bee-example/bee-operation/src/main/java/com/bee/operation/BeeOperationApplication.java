package com.bee.operation;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.metrics.buffering.BufferingApplicationStartup;

/**
 * 运营模块
 */
@SpringBootApplication
public class BeeOperationApplication {
    public static void main(String[] args) {
        SpringApplication application = new SpringApplication(BeeOperationApplication.class);
        application.setApplicationStartup(new BufferingApplicationStartup(2048));
        application.run(args);
        System.out.println("(♥◠‿◠)ﾉﾞ  运营模块启动成功   ლ(´ڡ`ლ)ﾞ  ");
    }
}
