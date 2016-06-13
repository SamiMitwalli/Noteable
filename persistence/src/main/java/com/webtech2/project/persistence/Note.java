package com.webtech2.project.persistence;

import javax.persistence.*;

import java.util.Set;

/**
 *
 * Created by Sami Mitwalli on 06.06.2016.
 */
@Entity
public class Note {
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Id
    private Long                id;
    private String              title;          //Title of the Note
    private String              description;    //Short Description of the Note
    private String              content;        //Content of the Note
    //private User                owner;          //Id of Owner
    //private Set<Group>          group;          //Id of Group

    public Note(){}

    public Note(String title, String description, String content){
        this.title          = title;
        this.description    = description;
        this.content        = content;
    }

    public Note(Long id, String title, String description, String content){
        this.id             = id;
        this.title          = title;
        this.description    = description;
        this.content        = content;
    }

    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getContent() {
        return this.content;
    }

    public void setContent(String content) {
        this.content = content;
    }
/*
    @ManyToOne
    public User getOwner() {
        return this.owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }
*/
    /*@ManyToMany(mappedBy = "note")
    public Set<Group> getGroup() {
        return this.group;
    }

    public void setGroup(Set<Group> group) {
        this.group = group;
    }
*/
}
