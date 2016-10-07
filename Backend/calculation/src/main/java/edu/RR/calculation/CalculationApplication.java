package edu.RR.calculation;

import edu.RR.upload.model.RepositoryConfiguration;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

/**
 * Created by JasonGibson on 8/25/16.
 */
@SpringBootApplication
@EnableSwagger2
@Import(RepositoryConfiguration.class)
public class CalculationApplication {
    public static void main(String[] args) {
        SpringApplication.run(CalculationApplication.class);
    }
}
