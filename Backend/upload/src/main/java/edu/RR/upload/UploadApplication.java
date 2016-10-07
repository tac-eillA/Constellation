package edu.RR.upload;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.web.bind.annotation.CrossOrigin;
import springfox.documentation.swagger2.annotations.EnableSwagger2;


/**
 * Created by JasonGibson on 8/15/16.
 */
@SpringBootApplication
@EnableSwagger2
@CrossOrigin
//@Import(SecurityConfiguration.class)
public class UploadApplication  extends SpringBootServletInitializer {
    public static void main(String[] args) {
        SpringApplication.run(UploadApplication.class);
    }
}
