package edu.RR.calculation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

/**
 * Created by JasonGibson on 8/25/16.
 */
@RestController
@RequestMapping("/calculator")
public class CalculationController {

    public Map<String, CalculationService> calculationServiceMap;

    @Autowired
    public CalculationController(Map<String, CalculationService> calculationServiceMap) {
        this.calculationServiceMap = calculationServiceMap;
    }

    @RequestMapping(method = RequestMethod.GET)
    public String createSchedule() {
        return CalculationService.createAllSchedules(calculationServiceMap);
    }


}
