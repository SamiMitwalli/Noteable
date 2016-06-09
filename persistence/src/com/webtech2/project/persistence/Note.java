package com.webtech2.project.persistence;

import javax.persistence.*;
import java.util.Set;

/**
 * Created by Sami Mitwalli on 06.06.2016.
 */
@Entity
public class Note {
    @GeneratedValue
    @Id
    private Long                id;
    private String              title;          //Title of the Note
    private String              description;    //Short Description of the Note
    private String              content;        //Content of the Note
    private User                owner;          //Id of Owner
    private Set<Group>          group;          //Id of Group

    public Note(){}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    @ManyToOne
    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    @ManyToMany(mappedBy = "note")
    public Set<Group> getGroup() {
        return group;
    }

    public void setGroup(Set<Group> group) {
        this.group = group;
    }
}
