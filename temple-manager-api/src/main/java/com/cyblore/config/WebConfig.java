package com.cyblore.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.lang.NonNull;

@Configuration
public class WebConfig implements WebMvcConfigurer {

        @Override
        public void addViewControllers(@NonNull ViewControllerRegistry registry) {
                registry.addViewController("/")
                                .setViewName("forward:/index.html");
                registry.addViewController("/{x:[\\w\\-]+}")
                                .setViewName("forward:/index.html");
                registry.addViewController("/{x:^(?!api$).*$}/**/{y:[\\w\\-]+}")
                                .setViewName("forward:/index.html");
        }
}
