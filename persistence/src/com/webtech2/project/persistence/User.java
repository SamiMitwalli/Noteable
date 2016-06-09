package com.webtech2.project.persistence;

import javax.persistence.*;
import java.util.Set;

/**
 * Created by Sami Mitwalli on 06.06.2016.
 */
@Entity
public class User {

    @GeneratedValue
    @Id
    private Long        id;
    private String      login_name;     //Username
    private String      password;       //Password
    private Set<Note>   note;           //created Notes of the User
    private Set<Group>  group;          //Groups the User is part of

    public User(){}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLogin_name() {
        return login_name;
    }

    public void setLogin_name(String login_name) {
        this.login_name = login_name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @ManyToMany(mappedBy = "user")
    public Set<Group> getGroup() {
        return group;
    }

    public void setGroup(Set<Group> group) {
        this.group = group;
    }

    @OneToMany(mappedBy = "owner")
    public Set<Note> getNote() {
        return note;
    }

    public void setNote(Set<Note> note) {
        this.note = note;
    }
}
