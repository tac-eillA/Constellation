package edu.RR.upload.model;

/**
 * Created by JasonGibson on 8/25/16.
 */
public class Person {
    private String[] schedule;

    public String[] getSchedule() {
        return schedule;
    }

    public void setSchedule(String[] schedule) {
        this.schedule = schedule;
    }

    @Override
    public String toString() {
        if (schedule == null || schedule.length == 0) {
            return "Schedule not set";
        }
        StringBuffer stringBuilder = new StringBuffer();
        for(int i = 0; i < schedule.length; i++) {
            stringBuilder.append("period ");
            stringBuilder.append(i + 1);
            stringBuilder.append(" class ");
            stringBuilder.append(schedule[i]);
            stringBuilder.append("   ");
        }
        return stringBuilder.toString();
    }
}
