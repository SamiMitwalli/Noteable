package com.webtech2.project.persistence;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

/**
 *
 * Created by Sami Mitwalli on 06.06.2016.
 */
@Entity
@Table(name="users")
public class Users {
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Id
    private Long                id;
    @NotNull
    private String              loginName;      //Username
    @NotNull
    private String              password;       //Password
    private String              role;
    @OneToMany(mappedBy = "owner")
    private List<Notes>         notes;           //created Notes of the User
    @ManyToMany
    private List<Groups>        groups;          //Groups the User is part of

    public Users(){}

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

    public void setGroups(List<Groups> groups) {
        this.groups = groups;
    }

    public List<Notes> getNotes() {
        return notes;
    }

    public void setNotes(List<Notes> notes) {
        this.notes = notes;
    }


    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
