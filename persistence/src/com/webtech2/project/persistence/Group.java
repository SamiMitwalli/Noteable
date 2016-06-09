package com.webtech2.project.persistence;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import java.util.Set;

/**
 * Created by Sami Mitwalli on 06.06.2016.
 */
@Entity
public class Group {

    @GeneratedValue
    @Id
    private long        id;         //Id of the Group
    private String      group_name; //Name of the Group
    private Set<Note>   note;       //Accessable Notes
    private Set<User>   user;       //Users of the Group

    public Group(){}

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getGroup_name() {
        return group_name;
    }

    public void setGroup_name(String group_name) {
        this.group_name = group_name;
    }

    @ManyToMany(mappedBy = "group")
    public Set<Note> getNote() {
        return note;
    }

    public void setNote(Set<Note> note) {
        this.note = note;
    }

    @ManyToMany(mappedBy = "group")
    public Set<User> getUser() {
        return user;
    }

    public void setUser(Set<User> user) {
        this.user = user;
    }
}
