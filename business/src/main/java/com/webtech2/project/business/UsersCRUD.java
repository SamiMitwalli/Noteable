package com.webtech2.project.business;

import com.webtech2.project.persistence.*;

import javax.json.JsonObject;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.xml.registry.infomodel.User;
import java.util.List;

/**
 * Created by Sami Mitwalli on 20.06.2016.
 *
 */
@Path("/Users")
public class UsersCRUD extends JAXRS{

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String test(){
        return "UsersCRUD is working!";
    }

    /*REST*/
    @POST
    @Path("/createNote")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.TEXT_PLAIN)
    public Long createUser(JsonObject obj){
        Users user = new Users();
        /* NOT ALLOWED IN CREATION
        note.setId(Long.parseLong(""+obj.get("id")));
         */
        user.setLoginName(obj.get("loginName").toString());
        user.setPassword(obj.get("password").toString());
        // NotesCRUD notesCRUD = new NotesCRUD();
      //  user.setNotes(notesCRUD.read(Long.parseLong(""+obj.get("notes").toString())));
        //GroupsCRUD groupsCRUD = new GroupsCRUD();
        //user.setGroups(groupsCRUD.read(Long.parseLong(obj.get("groups").toString())));

        return this.create(user);
    }
    @GET
    @Path("/readUser/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Users readUserByID(@PathParam("id") long id){
        return this.read(id);
    }
    @POST
    @Path("/readUser")
    @Produces(MediaType.APPLICATION_JSON)
    public Users readUser (long id){
        return this.read(id);
    }
    @POST
    @Path("/updateUser")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.TEXT_PLAIN)
    public long updateUser(JsonObject obj){
        Users user = new Users();
        user.setId(Long.parseLong(""+obj.get("id")));
        user.setLoginName(obj.get("loginName").toString());
        user.setPassword(obj.get("password").toString());
        //NotesCRUD notesCRUD = new NotesCRUD();
        //user.setNotes(notesCRUD.read(Long.parseLong(""+obj.get("notes").toString())));
        //GroupsCRUD groupsCRUD = new GroupsCRUD();
        //user.setGroups(groupsCRUD.read(Long.parseLong(obj.get("groups").toString())));

        return this.update(user);
        }
    // only admin?
    @POST
    @Path("/deleteUser")
    @Consumes(MediaType.TEXT_PLAIN)
    @Produces(MediaType.TEXT_PLAIN)
    public Long deleteUser(Long id) {
        return this.delete(id);
    }
    /*Only For Admin use*/
    @GET
    @Path("/deleteAll")
    @Produces(MediaType.TEXT_PLAIN)
    public String deleteAllNotes(){
        List<Users> allUsers = this.readAll();
        String result="";
        for (Users allUser : allUsers) {
            result += "deleted Note " + this.delete(allUser.getId()) + "\n";
        }
        return result;
    }
    @GET
    @Path("/readAll")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Users> readAllNotes(){
        return this.readAll();
    }





// DATABASE QUERIES
    private Long create(Users user) {
        if(user.getId()==null) {
            this.init();
            this.em.persist(user);
            this.commit();
            this.shutdown();
            return user.getId();
        }
        else {
            return this.update(user);
        }
    }
    public Users read(Long id){
        this.init();
        Users user = em.find(Users.class, id);
        this.commit();
        this.shutdown();
        return user;
    }
    public List<Users> readAll(){
        this.init();
        CriteriaBuilder builder = emFactory.getCriteriaBuilder();

        CriteriaQuery<Users> query = builder.createQuery(Users.class);
        Root<Users> root = query.from(Users.class);
        query.select(root);

        List<Users> users = em.createQuery(query).getResultList();
        this.commit();
        this.shutdown();
        return users;
    }
    public Long update(Users user){
        if(this.read(user.getId())!=null) {
            this.init();
            this.em.merge(user);
            this.commit();
            this.shutdown();
            return user.getId();
        }
        else {
            return null;
        }
    }
    public Long delete(Long id){
        this.init();
        Users user = em.getReference(Users.class, id);
        if(user!=null) {
            this.em.remove(user);
            this.commit();
            this.shutdown();
            return user.getId();
        }
        else {
            this.shutdown();
            return null;
        }
    }
}
