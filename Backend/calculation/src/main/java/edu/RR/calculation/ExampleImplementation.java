package edu.RR.calculation;

import edu.RR.upload.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by JasonGibson on 8/25/16.
 */
@Service // this allows Spring Boot to find this class or bean
public class ExampleImplementation extends CalculationService {// must extends this class so that I can use inheritance to autowire this beans in
    private final StudentRepository studentRepository;
    private final TeacherRepository teacherRepository;
    private final ClassRepository classRepository;

    @Autowired
    public ExampleImplementation(StudentRepository studentRepository, TeacherRepository teacherRepository, ClassRepository classRepository) {
        this.studentRepository = studentRepository;
        this.teacherRepository = teacherRepository;
        this.classRepository = classRepository;
    }

    @Override // makes sure that this overrides the method from the superclass
    public List<Person> createSchedule() {
        List<Person> result = new ArrayList<>();
        for(Person current : studentRepository.findAll()) {
            Student temp = (Student) current;
            temp.setSchedule(temp.getPrimaryClasses());
            result.add(temp);
        }
        for(Person current : teacherRepository.findAll()) {
            Teacher temp = (Teacher) current;
            String[] holder = {"1", "2", "3", "4", "5", "6", "7", "8"};
            temp.setSchedule(holder);
            result.add(temp);
        }
        return result;
    }
}
