package com.webtech2.project.persistence;

import javax.persistence.*;
//import java.util.List;
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
    private String              content;         //Content of the Note
    @ManyToOne
    private Users               owner;           //Owner of the Note

    public Notes(){}

    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
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

}
