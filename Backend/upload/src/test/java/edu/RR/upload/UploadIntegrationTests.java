package edu.RR.upload;

import edu.RR.upload.model.Class;
import edu.RR.upload.model.*;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.HashSet;
import java.util.Set;

import static org.junit.Assert.assertTrue;

/**
 * Created by JasonGibson on 8/23/16.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = {RepositoryConfiguration.class})
public class UploadIntegrationTests {

    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private ClassRepository classRepository;
    @Autowired
    private TeacherRepository teacherRepository;

    private Student student;
    private Teacher teacher;
    private Class hClass;

    @Before
    public void setUp() {
        student = new Student();
        student.setId("123");
        String[] primaryClasses = {"1","2","3","4","5","6", "7", "8"};
        student.setPrimaryClasses(primaryClasses);
        String[] alternativeClasses = {"9", "10"};
        student.setAlternativeClasses(alternativeClasses);
        studentRepository.save(student);
        teacher = new Teacher();
        teacher.setId("456");
        hClass = new Class();
        hClass.setClassNumber("789");
        Set<Teacher> teacherSet = new HashSet<>();
        teacherSet.add(teacher);
        Set<Class> classSet = new HashSet<>();
        classSet.add(hClass);
        hClass.setTeachers(teacherSet);
        teacher.setClasses(classSet);
        teacherRepository.save(teacher);
        classRepository.save(hClass);
    }

    @Test
    public void ensureEntitiesBeingSavedTest() {
        assertTrue(studentRepository.findOne("123") != null);
        assertTrue(classRepository.findOne("789") != null);
        assertTrue(teacherRepository.findOne("456") != null);
        assertTrue(studentRepository.findOne("123").equals(student));
        assertTrue(classRepository.findOne("789").equals(hClass));
        assertTrue(teacherRepository.findOne("456").equals(teacher));
    }

}
