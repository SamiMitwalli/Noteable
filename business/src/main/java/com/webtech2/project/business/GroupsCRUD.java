package com.webtech2.project.business;

import com.webtech2.project.persistence.*;

import javax.json.JsonObject;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

/**
 * Created by Sami Mitwalli on 20.06.2016.
 *
 */

// bisher ohne tests
@Path("/Groups")
public class GroupsCRUD extends JAXRS{

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String test(){
        return "GroupsCRUD is working!";
    }

    /*REST*/
    @POST
    @Path("/createNote")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.TEXT_PLAIN)
    public Long createGroup(JsonObject obj){
        Groups group = new Groups();
        /* NOT ALLOWED IN CREATION
        note.setId(Long.parseLong(""+obj.get("id")));
         */
        group.setGroup_name(obj.get("groupName").toString());

        // NotesCRUD notesCRUD = new NotesCRUD();
        // group.setNotes(notesCRUD.read(Long.parseLong(""+obj.get("notes").toString())));
        //UsersCRUD usersCRUD = new UsersCRUD();
        //group.setUsers(usersCRUD.read(Long.parseLong(obj.get("users").toString())));

        return this.create(group);
    }
    @GET
    @Path("/readUser/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Groups readGroupByID(@PathParam("id") long id){
        return this.read(id);
    }
    @POST
    @Path("/readUser")
    @Produces(MediaType.APPLICATION_JSON)
    public Groups readGroup (long id){
        return this.read(id);
    }
    @POST
    @Path("/updateUser")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.TEXT_PLAIN)
    public long Groups(JsonObject obj){
        Groups  group = new Groups();
        group.setId(Long.parseLong(""+obj.get("id")));
        group.setGroup_name(obj.get("groupName").toString());
      //  NotesCRUD notesCRUD = new NotesCRUD();
       // group.setNotes(notesCRUD.read(Long.parseLong(""+obj.get("notes").toString())));
        //UsersCRUD usersCRUD = new UsersCRUD();
        //group.setUsers(usersCRUD.read(Long.parseLong(obj.get("users").toString())));

        return this.update(group);
    }
    // only admin?
    @POST
    @Path("/deleteGroup")
    @Consumes(MediaType.TEXT_PLAIN)
    @Produces(MediaType.TEXT_PLAIN)
    public Long deleteGroup(Long id) {
        return this.delete(id);
    }
    /*Only For Admin use*/
    @GET
    @Path("/deleteAll")
    @Produces(MediaType.TEXT_PLAIN)
    public String deleteAllNotes(){
        List<Groups> allGroups = this.readAll();
        String result="";
        for (Groups allGroup : allGroups) {
            result += "deleted Note " + this.delete(allGroup.getId()) + "\n";
        }
        return result;
    }
    @GET
    @Path("/readAll")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Groups> readAllNotes(){
        return this.readAll();
    }


    // DATABASE QUERIES
    public Long create(Groups group) {

        if(group.getId()==null) {
            this.init();
            this.em.persist(group);
            this.commit();
            this.shutdown();
            return group.getId();
        }
        else {
            return this.update(group);
        }
    }
    public Groups read(Long id){
        this.init();
        Groups group = em.find(Groups.class, id);
        this.commit();
        this.shutdown();
        return group;
    }
    public List<Groups> readAll(){
        this.init();
        CriteriaBuilder builder = emFactory.getCriteriaBuilder();

        CriteriaQuery<Groups> query = builder.createQuery(Groups.class);
        Root<Groups> root = query.from(Groups.class);
        query.select(root);

        List<Groups> groups = em.createQuery(query).getResultList();
        this.commit();
        this.shutdown();
        return groups;
    }
    public Long update(Groups group){
        if(this.read(group.getId())!=null) {
            this.init();
            this.em.merge(group);
            this.commit();
            this.shutdown();
            return group.getId();
        }
        else {
            return null;
        }
    }
    public Long delete(Long id){
        this.init();
        Groups group = em.getReference(Groups.class, id);
        if(group!=null) {
            this.em.remove(group);
            this.commit();
            this.shutdown();
            return group.getId();
        }
        else {
            this.shutdown();
            return null;
        }
    }
}
