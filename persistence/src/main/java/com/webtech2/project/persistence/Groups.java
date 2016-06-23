package com.webtech2.project.persistence;

import javax.persistence.*;
import java.util.List;

/**
 *
 * Created by Sami Mitwalli on 06.06.2016.
 */
@Entity
public class Groups {
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Id
    private long            id;         //Id of the Group
    private String          groupName;  //Name of the Group
    @ManyToMany(mappedBy = "groups")
    private List<Notes>      notes;     //Accessable Notes
    @ManyToMany(mappedBy = "groups")
    private List<Users>      users;     //Users of the Group

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

    public List<Notes> getNote() {
        return notes;
    }

    public void setNote(List<Notes> notes) {
        this.notes = notes;
    }

    public List<Users> getUser() {
        return users;
    }

    public void setUser(List<Users> users) {
        this. users =  users;
    }
}
