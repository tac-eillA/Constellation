package edu.RR.upload;

import edu.RR.upload.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by JasonGibson on 8/15/16.
 */
@Service
public class UploadService {

    private final StudentRepository studentRepository;
    private final TeacherRepository teacherRepository;
    private final ClassRepository classRepository;

    @Autowired
    public UploadService(StudentRepository studentRepository, TeacherRepository teacherRepository, ClassRepository classRepository) {
        this.studentRepository = studentRepository;
        this.teacherRepository = teacherRepository;
        this.classRepository = classRepository;
    }

    public void parseCSV(String input) {
        for(String current : input.split("\n")) {
            studentRepository.save(new Student(current));
        }
    }



    public void clear() {
        studentRepository.deleteAll();
        teacherRepository.deleteAll();
        classRepository.deleteAll();
    }

    public String getAllStudents() {
        StringBuilder stringBuilder = new StringBuilder();
        for (Student current : studentRepository.findAll()) {
            stringBuilder.append(current.toString());
            stringBuilder.append("\n");
        }
        return stringBuilder.toString();
    }
}
