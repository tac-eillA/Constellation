package edu.RR.upload.model;

import javax.persistence.*;

/**
 * Created by JasonGibson on 8/16/16.
 */
@Entity
@Table(name = "STUDENT")
public class Student extends Person {

    @Id
    private String id;
    private String[] primaryClasses;
    private String[] alternativeClasses;

    public Student() {}

    public Student(String input) {
        String[] temp = input.split(",");
        setId(temp[0]);
        getPrimaryClasses(temp);
        getAlternativeClasses(temp);
    }

    public Student(String id, String[] primaryClasses, String[] alternativeClasses) {
        this.id = id;
        this.alternativeClasses = alternativeClasses;
        this.primaryClasses = primaryClasses;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String[] getPrimaryClasses() {
        return primaryClasses;
    }

    public void setPrimaryClasses(String[] primaryClasses) {
        this.primaryClasses = primaryClasses;
    }

    public String[] getAlternativeClasses() {
        return alternativeClasses;
    }

    public void setAlternativeClasses(String[] alternativeClasses) {
        this.alternativeClasses = alternativeClasses;
    }

    public boolean equals(Object object) {
        boolean result = false;
        if (object instanceof Student) {
            Student temp = (Student) object;
            if (result = temp.getId().equals(this.getId()) && this.primaryClasses.length == temp.getPrimaryClasses().length && this.alternativeClasses.length == temp.getAlternativeClasses().length) {
                for(int i = 0; i < primaryClasses.length; i++) {
                    result = result && primaryClasses[i].equals(temp.getPrimaryClasses()[i]);
                }
                for(int i = 0; i < alternativeClasses.length; i++) {
                    result = result && alternativeClasses[i].equals(temp.getAlternativeClasses()[i]);
                }
            }
        }
        return result;
    }

    @Override
    public String toString() {
        StringBuffer stringBuffer = new StringBuffer();
        stringBuffer.append("student: ");
        stringBuffer.append(id);
        stringBuffer.append(" ");
        stringBuffer.append(super.toString());
        return stringBuffer.toString();
    }

    private void getAlternativeClasses(String[] temp) {
        this.alternativeClasses = new String[2];
        for(int i = 9; i < 11; i++) {
            this.alternativeClasses[i - 9] = temp[i];
        }
    }

    private void getPrimaryClasses(String[] temp) {
        this.primaryClasses = new String[8];
        for(int i = 1; i < 9; i++) {
            this.primaryClasses[i - 1] = temp[i];
        }
    }

}
