package edu.RR.calculation;

import edu.RR.upload.model.Person;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * Created by JasonGibson on 8/25/16.
 */
@Service
public abstract class CalculationService {
    public abstract List<Person> createSchedule();

    public static String createAllSchedules(Map<String, CalculationService> calculationServiceMap) {
        StringBuilder stringBuffer = new StringBuilder();
        for(String currentAlgorithm : calculationServiceMap.keySet()) {
            stringBuffer.append(currentAlgorithm);
            stringBuffer.append(":\n");
            List<Person> personList = calculationServiceMap.get(currentAlgorithm).createSchedule();
            stringBuffer.append(parseList(personList));
            stringBuffer.append(getMetrics(personList));
            stringBuffer.append("\n");
        }
        return stringBuffer.toString();
    }

    private static String parseList(List<Person> personList) {
        StringBuilder stringBuffer = new StringBuilder();
        for(Person person : personList) {
            stringBuffer.append(person.toString());
            stringBuffer.append("\n");
        }
        return stringBuffer.toString();
    }


    private static String getMetrics(List<Person> personList) {
        return "metrics not yet supported";
    }
}
