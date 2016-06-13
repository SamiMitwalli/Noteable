package com.webtech2.project.persistence;

import javax.persistence.*;
import java.util.List;

/**
 *
 * Created by Sami Mitwalli on 06.06.2016.
 */
@Entity
public class User {
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Id
    private Long                id;
    private String              loginName;      //Username
    private String              password;       //Password
    @OneToMany(mappedBy = "owner")
    private List<Note>          note;           //created Notes of the User
    @ManyToMany
    private List<Groups>         groups;          //Groups the User is part of

    public User(){}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLoginName() {
        return loginName;
    }

    public void setLoginName(String loginName) {
        this.loginName = loginName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Groups> getGroups() {
        return groups;
    }

    public void setGroup(List<Groups> groups) {
        this.groups = groups;
    }

    public List<Note> getNote() {
        return note;
    }

    public void setNote(List<Note> note) {
        this.note = note;
    }
}
