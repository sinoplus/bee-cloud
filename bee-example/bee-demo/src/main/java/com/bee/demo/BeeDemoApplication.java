package com.bee.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.metrics.buffering.BufferingApplicationStartup;

/**
 * 演示模块
 *
 */
@SpringBootApplication
public class BeeDemoApplication {
    public static void main(String[] args) {
        SpringApplication application = new SpringApplication(BeeDemoApplication.class);
        application.setApplicationStartup(new BufferingApplicationStartup(2048));
        application.run(args);
        System.out.println("(♥◠‿◠)ﾉﾞ  演示模块启动成功   ლ(´ڡ`ლ)ﾞ  ");
    }
}
