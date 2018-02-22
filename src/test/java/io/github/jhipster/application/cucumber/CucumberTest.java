package io.github.jhipster.application.cucumber;

import org.junit.runner.RunWith;


import io.github.jhipster.application.AbstractCassandraTest;
import cucumber.api.CucumberOptions;
import cucumber.api.junit.Cucumber;

@RunWith(Cucumber.class)
@CucumberOptions(plugin = "pretty", features = "src/test/features")
public class CucumberTest extends AbstractCassandraTest {

}
