package com.webtech2.project.rest;

import com.webtech2.project.persistence.Note;
import com.webtech2.project.persistence.NoteDAO;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.POST;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.List;
//import javax.ejb.Stateless;
/**
 *
 * Created by Sami Mitwalli on 08.06.2016.
 *
 */
@Path("/NoteResource")
public class NoteResource {

    @GET
    @Path("getAll")
    @Produces(MediaType.TEXT_PLAIN)
    public String doGetAll(){
        NoteDAO noteDAO = new NoteDAO();
        noteDAO.init();
        List<Note> notes = noteDAO.doGet();
        noteDAO.shutdown();
        //MANAGING OUTPUT
        String a="DATABASE:\n";
        for ( Note note : notes) {
            a+="Id: "+note.getId()+"\n";
            a+="Title: "+note.getTitle()+"\n";
            a+="Description: "+note.getDescription()+"\n";
            a+="Content: "+note.getContent()+"\n";
        }

        return a;
    }

    @POST
    @Path("create")
    @Produces(MediaType.TEXT_PLAIN)
    public String doCreateOrUpdate(Note note){
        NoteDAO noteDAO = new NoteDAO();
        noteDAO.init();
        noteDAO.createOrUpdate(note);
        noteDAO.shutdown();
        return "Note added/modified!";
    }

    @POST
    @Path("readByTitle")
    @Produces(MediaType.TEXT_PLAIN)
    public Note doGetByTitle(String title){
        NoteDAO noteDAO = new NoteDAO();
        noteDAO.init();
        Note note = noteDAO.getNoteByTitle(title);
        noteDAO.shutdown();
        return note;
    }

    @POST
    @Path("readById")
    @Produces(MediaType.TEXT_PLAIN)
    public Note doGetById(Long id){
        NoteDAO noteDAO = new NoteDAO();
        noteDAO.init();
        Note note = noteDAO.getNoteById(id);
        noteDAO.shutdown();
        return note;
    }

    @POST
    @Path("delete")
    @Produces(MediaType.TEXT_PLAIN)
    public String doDelete(Note note){
        NoteDAO noteDAO = new NoteDAO();
        noteDAO.init();
        noteDAO.delete(note);
        noteDAO.shutdown();
        return "Note "+note.getId()+" deleted!";
    }

    @GET
    @Path("CRUDTEST")
    @Produces(MediaType.TEXT_PLAIN)
    public String doCRUDTEST(){

        String log="-STARTING-CRUD-TEST-"+"\n";
        log+="C-REATING\nR-EADING\nU-PDATING\nD-ELETING\n\n";
        //READ
        log+="READING:\n";
        log+=this.doGetAll()+"\n\n";

        //CREATE
        log+="CREATING:\n";
        Note note = new Note("CREATION","test","content");
        log+=this.doCreateOrUpdate(note)+"\n\n";

        //READ
        log+="READING:\n";
        log+=this.doGetAll()+"\n\n";

        //UPDATE
        log+="UPDATING:\n";
        note = this.doGetByTitle("CREATION");
        log+="Note "+note.getId()+" ";
        note.setTitle("UPDATE");
        log+=this.doCreateOrUpdate(note)+"\n\n";

        //READ
        log+="READING:\n";
        log+=this.doGetAll()+"\n\n";

        //DELETE
        log+="DELETING:\n";
        log+=this.doDelete(note)+"\n\n";

        //READ
        log+="READING:\n";
        log+=this.doGetAll()+"\n\n";

        return log;
    }

    @GET
    @Path("deleteAll")
    @Produces(MediaType.TEXT_PLAIN)
    public String doDeleteAll(){
        NoteDAO noteDAO = new NoteDAO();
        noteDAO.init();

        for(Note note : noteDAO.doGet()){
            this.doDelete(note);
        }
        noteDAO.shutdown();
        return "All Notes Deleted!\n";
    }

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String doPOST(){
        return "-RESTful-Service-";
    }

}
