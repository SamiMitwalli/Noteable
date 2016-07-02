package com.webtech2.project.persistence;

import javax.persistence.*;
import java.util.List;

/**
 *
 * Created by Sami Mitwalli on 06.06.2016.
 */
@Entity
@Table(name="notes")
public class Notes {
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Id
    private Long                id;
    private String              title;           //Title of the Note
    private String              description;     //Short Description of the Note
    private String              content;         //Content of the Note
    @ManyToOne
    private Users               owner;           //Owner of the Note
    @ManyToMany
    private List<Groups>        groups;          //Id of Group

    public Notes(){}

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

    public Users getOwner() {
        return this.owner;
    }

    public void setOwner(Users owner) {
        this.owner = owner;
    }

    public List<Groups> getGroups() {
        return this.groups;
    }

    public void setGroups(List<Groups> groups) {
        this.groups = groups;
    }

}
