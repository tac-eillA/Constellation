package edu.RR.upload;

import edu.RR.upload.model.Person;
import edu.RR.upload.model.Student;
import edu.RR.upload.model.StudentRepository;
import org.junit.Before;
import org.junit.Test;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.client.RestTemplate;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

/**
 * Created by JasonGibson on 8/16/16.
 */
public class UploadUnitTests {
    private UploadService uploadService;
    private StudentRepository studentRepository;
    private final String sql = "INSERT INTO student(id, primary_classes, alternative_classes) VALUES(?,?,?)";

    @Before
    public void setUp() {
        this.studentRepository = mock(StudentRepository.class);
        this.uploadService = new UploadService(studentRepository, null, null); // TODO fix tests
    }

    @Test
    public void parseCSVTestSingleLine() {
        String testString = "123,1,2,3,4,5,6,7,8,9,10";
        uploadService.parseCSV(testString);
        Student student = new Student();
        student.setId("123");
        String[] primaryClasses = {"1","2","3","4","5","6", "7", "8"};
        student.setPrimaryClasses(primaryClasses);
        String[] alternativeClasses = {"9", "10"};
        student.setAlternativeClasses(alternativeClasses);
        verify(studentRepository).save(student);
    }

    @Test
    public void parseCSVTestMultipleLines() {
        String testString = "123,1,2,3,4,5,6,7,8,9,10" +
                "\n123,1,2,3,4,5,6,7,8,9,10" +
                "\n123,1,2,3,4,5,6,7,8,9,10";
        uploadService.parseCSV(testString);
        Student student = new Student();
        student.setId("123");
        String[] primaryClasses = {"1","2","3","4","5","6", "7", "8"};
        student.setPrimaryClasses(primaryClasses);
        String[] alternativeClasses = {"9", "10"};
        student.setAlternativeClasses(alternativeClasses);
        verify(studentRepository, times(3)).save(student);
    }

}
