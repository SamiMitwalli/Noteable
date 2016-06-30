package com.webtech2.project.business;


import com.webtech2.project.persistence.Notes;
import org.apache.shiro.authz.annotation.RequiresAuthentication;
import org.apache.shiro.authz.annotation.RequiresRoles;

import javax.ejb.Stateless;
import javax.json.*;
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
@Path("/Notes")
public class NotesCRUD extends HibernateConnector {

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String test(){
        return "NotesCRUD is working!";
    }

    /*FEHLER IM JSON PARSEN DURCH POSTGRES BEKANNT. DA NUR FÜR TEST=>IRRELEVANT*/
    @GET
    @Path("/CRUDTEST")
    @Produces(MediaType.TEXT_PLAIN)
    public String crudTest(){
        String result="";
        JsonObject obj;
        Notes note;
        Long id;

        obj = Json.createObjectBuilder()
                .add("title","A")
                .add("content", "B")
                .add("description","C")
                .build();

        id = this.createNote(obj);
        result+="1. Creating Note: "+id+"\n";

        note = this.readNote(id);
        obj = this.pojo2Json(note);
        result+="2. Reading created Note:\n"+obj+"\n";

        note.setTitle("UPDATE");
        obj = this.pojo2Json(note);
        id = this.updateNote(obj);
        result+="3. Updating created Note: "+id+"\n";

        obj = this.pojo2Json(this.readNote(id));
        result+="4. Reading updated Note:\n"+obj+"\n";

        id = this.deleteNote(id);
        result+="5. Deleting updated Note: "+id+"\n";

        obj = this.pojo2Json(this.readNote(id));
        result+="6. Reading deleted Note:\n"+obj+"\n";

        return result;
    }
    /*REST-SERVICES*/
    @POST
    @Path("/createNote")
    @RequiresAuthentication
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.TEXT_PLAIN)
    public Long createNote(JsonObject obj){

        Notes note = new Notes();
        /* NOT ALLOWED IN CREATION
        note.setId(Long.parseLong(""+obj.get("id")));
         */
        note.setTitle(obj.get("title").toString());
        note.setContent(obj.get("content").toString());
        note.setDescription(obj.get("description").toString());
        //UsersCRUD usersCRUD = new UsersCRUD();
        //note.setOwner(usersCRUD.read(Long.parseLong(""+obj.get("owner").toString())));
        //GroupsCRUD groupsCRUD = new GroupsCRUD();
        //note.setGroups(groupsCRUD.read(Long.parseLong(obj.get("groups").toString())));

        Long result = this.create(note);
        return result;
    }
    @GET
    @Path("/readNote/{id}")
    @RequiresAuthentication
    @Produces(MediaType.APPLICATION_JSON)
    public Notes readNote(@PathParam("id") long id){
        Notes result = this.read(id);
        return result;
    }
    @POST
    @Path("/readNote")
    @RequiresAuthentication
    @Produces(MediaType.APPLICATION_JSON)
    public Notes readNote2(long id){
        Notes result = this.read(id);
        return result;
    }
    @POST
    @Path("/updateNote")
    @RequiresAuthentication
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.TEXT_PLAIN)
    public Long updateNote(JsonObject obj){
        Notes note = new Notes();
        note.setId(Long.parseLong(""+obj.get("id")));
        note.setTitle(obj.get("title").toString());
        note.setContent(obj.get("content").toString());
        note.setDescription(obj.get("description").toString());
        //UsersCRUD usersCRUD = new UsersCRUD();
        //note.setOwner(usersCRUD.read(Long.parseLong(""+obj.get("owner").toString())));
        //GroupsCRUD groupsCRUD = new GroupsCRUD();
        //note.setGroups(groupsCRUD.read(Long.parseLong(obj.get("groups").toString())));

        Long result = this.update(note);
        return result;
    }
    @POST
    @Path("/deleteNote")
    @RequiresAuthentication
    @Consumes(MediaType.TEXT_PLAIN)
    @Produces(MediaType.TEXT_PLAIN)
    public Long deleteNote(Long id){
        Long result = this.delete(id);
        return result;
    }
    /*Only For Admin use untested*/
    @GET
    @Path("/deleteAll")
    @RequiresAuthentication
    @RequiresRoles("admin")
    @Produces(MediaType.TEXT_PLAIN)
    public String deleteAllNotes(){
        List<Notes> allNotes = this.readAll();
        String result="";
        for(int i=0;i<allNotes.size();i++){
            result+="deleted Note "+this.delete(allNotes.get(i).getId())+"\n";
        }
        return result;
    }
    @GET
    @Path("/readAll")
    @RequiresAuthentication
    @RequiresRoles("admin")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Notes> readAllNotes(){
        List<Notes> result = this.readAll();
        return result;
    }

    /*DATABASE QUERIES*/
    public Long create(Notes note){
        if(note.getId()==null) {
            this.init();
            this.em.persist(note);
            this.commit();
            return note.getId();
        }
        else {
            return this.update(note);
        }
    }
    public Notes read(Long id){
        this.init();
        Notes note = em.find(Notes.class, id);
        this.commit();
        return note;
    }
    public List<Notes> readAll(){
        this.init();
        CriteriaBuilder builder = emFactory.getCriteriaBuilder();

        CriteriaQuery<Notes> query = builder.createQuery(Notes.class);
        Root<Notes> root = query.from(Notes.class);
        query.select(root);

        List<Notes> notes = em.createQuery(query).getResultList();
        this.commit();
        return notes;
    }
    public Long update(Notes note){
        if(this.read(note.getId())!=null) {
            this.init();
            this.em.merge(note);
            this.commit();
            return note.getId();
        }
        else {
            return null;
        }
    }
    public Long delete(Long id){
        this.init();
        Notes note = em.getReference(Notes.class, id);
        if(note!=null) {
            this.em.remove(note);
            this.commit();
            return note.getId();
        }
        else {
            return null;
        }
    }

    /*SUPPORTING-METHODS*/
    //NUR FÜR CRUD-TEST
    public JsonObject pojo2Json(Notes note){
        if(note!=null) {
            JsonObject obj = Json.createObjectBuilder()
                    .add("id", note.getId())
                    .add("title", ""+note.getTitle())
                    .add("content", ""+note.getContent())
                    .add("description", ""+note.getDescription())
                    .build();
            return obj;
        }
        return null;
    }
}
