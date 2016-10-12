package edu.RR.upload.model;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import javax.persistence.*;
import java.util.Set;

/**
 * Created by JasonGibson on 8/22/16.
 */
@Entity
@Table(name = "TEACHER")
public class Teacher extends Person{

    @Id
    private String id;
    @ManyToMany(cascade={CascadeType.ALL}, fetch = FetchType.EAGER)
    @NotFound(action = NotFoundAction.IGNORE)
    private Set<Class> classes;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Set<Class> getClasses() {
        return classes;
    }

    public void setClasses(Set<Class> classes) {
        this.classes = classes;
    }

    @Override
    public boolean equals(Object other) {
        boolean result = false;
        if (other instanceof Teacher) {
            Teacher temp = (Teacher) other;
            result = temp.getId().equals(this.id);
            result = result && temp.getClasses().size() == this.classes.size();
            //result = result && temp.getClasses().containsAll(classes);
        }
        return result;
    }

    @Override
    public int hashCode() {
        int result = 37;
        result *= this.id.hashCode();
        return result;
    }

    @Override
    public String toString() {
        StringBuffer stringBuffer = new StringBuffer();
        stringBuffer.append("teacher: ");
        stringBuffer.append(id);
        stringBuffer.append(" ");
        stringBuffer.append(super.toString());
        return stringBuffer.toString();
    }
}
