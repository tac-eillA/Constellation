package edu.RR.upload.model;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import javax.persistence.*;
import java.util.Set;

/**
 * Created by JasonGibson on 8/22/16.
 */
@Entity
@Table(name = "CLASS")
public class Class {
    @Id
    private String classNumber;
    @ManyToMany(cascade={CascadeType.ALL}, fetch = FetchType.EAGER)
    @NotFound(action = NotFoundAction.IGNORE)
    private Set<Teacher> teachers;

    public String getClassNumber() {
        return classNumber;
    }

    public void setClassNumber(String classNumber) {
        this.classNumber = classNumber;
    }

    public Set<Teacher> getTeachers() {
        return teachers;
    }

    public void setTeachers(Set<Teacher> teachers) {
        this.teachers = teachers;
    }

    @Override
    public boolean equals(Object other) {
        boolean result = false;
        if (other instanceof Class) {
            Class temp = (Class) other;
            result = temp.getClassNumber().equals(this.classNumber);
            result = result && temp.getTeachers().size() == this.teachers.size();
            //result = result && temp.getTeachers().containsAll(teachers);
        }
        return result;
    }

    @Override
    public int hashCode() {
        int result = 37;
        result *= this.classNumber.hashCode();
        return result;
    }
}
