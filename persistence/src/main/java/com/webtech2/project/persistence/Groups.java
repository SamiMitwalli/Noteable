package com.webtech2.project.persistence;

import javax.persistence.*;
import java.util.List;

/**
 *
 * Created by Sami Mitwalli on 06.06.2016.
 */
@Entity
public class Groups {
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Id
    private long            id;         //Id of the Group
    private String          groupName;  //Name of the Group
    @ManyToMany(mappedBy = "groups")
    private List<Note>      note;       //Accessable Notes
    @ManyToMany(mappedBy = "groups")
    private List<User>      user;       //Users of the Group

    public Groups(){}

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getGroup_name() {
        return groupName;
    }

    public void setGroup_name(String groupName) {
        this.groupName = groupName;
    }

    public List<Note> getNote() {
        return note;
    }

    public void setNote(List<Note> note) {
        this.note = note;
    }

    public List<User> getUser() {
        return user;
    }

    public void setUser(List<User> user) {
        this.user = user;
    }
}
