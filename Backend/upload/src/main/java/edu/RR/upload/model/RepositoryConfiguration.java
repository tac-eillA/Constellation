package edu.RR.upload.model;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

/**
 * Created by JasonGibson on 8/24/16.
 */
@Configuration
@EnableAutoConfiguration
@EntityScan(basePackages = {"edu.RR.upload.model"})
@EnableJpaRepositories(basePackages = {"edu.RR.upload.model"})
@EnableTransactionManagement
public class RepositoryConfiguration {
}
