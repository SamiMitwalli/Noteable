package com.webtech2.project.persistence;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
/**
 *
 * Created by Sami Mitwalli on 11.06.2016.
 */
public class NoteDAO {
    private EntityManagerFactory emFactory;
    private EntityManager em;
/*
    public static void main(String[] args){
        Fetcher fetcher= new Fetcher();
        fetcher.init();
        //Get Notes
        List<Note> notes = fetcher.getNotes();
        for ( Note note : notes) {
            System.out.println("Id: "+note.getId());
            System.out.println("Title: "+note.getTitle());
            System.out.println("Description: "+note.getDescription());
            System.out.println("Content: "+note.getContent());
        }
        System.out.println("");

        Get One Collumn (Content)
        List<String> notes2 = fetcher.getContent();
        for ( String content : notes2) {
            System.out.println("Content: "+content);
        }

        System.out.println(fetcher.count()+" Elements fetched!");
        //Create new Database-Entry
        fetcher.create("new","des","abcasd");

        //Shutdown
        fetcher.shutdown();
    }*/

    public void init(){
        emFactory = Persistence.createEntityManagerFactory("noteable");
        em = emFactory.createEntityManager();
        em.getTransaction().begin();
    }

    public List<Note> doGet(){
        //Get All Notes
        return this.getAll();
    }

    public int count(){
        CriteriaBuilder builder = emFactory.getCriteriaBuilder();
        //BUILDING QUERY
        CriteriaQuery<Note> query = builder.createQuery(Note.class);
        Root<Note> root = query.from(Note.class);
        query.select(root);
        return em.createQuery(query).getResultList().size();
    }

    //READ
    public List<Note> getAll(){
        CriteriaBuilder builder = emFactory.getCriteriaBuilder();

        //QUERY
        CriteriaQuery<Note> query = builder.createQuery(Note.class);
        Root<Note> root = query.from(Note.class);
        query.select(root);
        //query.where(builder.equal(root.get("content"),"abcasd"));

        return em.createQuery(query).getResultList();
    }
    //READ
    public List<String> getContent(){
        CriteriaBuilder builder = emFactory.getCriteriaBuilder();
        //QUERY
        //FOR MULTIPLE COLLUMNS: Object[] instead of String
        CriteriaQuery<String> query = builder.createQuery(String.class);
        Root<Note> root = query.from(Note.class);
        //FOR MULTIPLE COLLUMNS: builder.array(root.get("id"),root.get("content"))
        //FOR EXPRESSION: bsp. builder.max;avg;min...
        query.select(root.get("content").as(String.class));
        query.where(builder.equal(root.get("content"),"abcasd"));
        //FOR MULTIPLE COLLUMNS: returns Object[]
        //FOR SINGLE RESULT: getSingleResult()
        return em.createQuery(query).getResultList();
    }
    //READ
    public Note getNoteById(Long id){
        CriteriaBuilder builder = emFactory.getCriteriaBuilder();

        CriteriaQuery<Note> query = builder.createQuery(Note.class);
        Root<Note> root = query.from(Note.class);
        query.select(root);
        query.where(builder.equal(root.get("id"),id));

        return em.createQuery(query).getSingleResult();
    }
    public Note getNoteByTitle(String title){
        CriteriaBuilder builder = emFactory.getCriteriaBuilder();

        CriteriaQuery<Note> query = builder.createQuery(Note.class);
        Root<Note> root = query.from(Note.class);
        query.select(root);
        query.where(builder.equal(root.get("title"),title));

        return em.createQuery(query).getResultList().get(0);
    }

    //CREATE-OR-UPDATE
    public void createOrUpdate(Note note){
        if(note.getId()==null)
            this.em.persist(note);
        else
            this.em.merge(note);
    }
    //CREATE
    public void create(String title, String description, String content){
        final Note note = new Note();
        note.setTitle(title);
        note.setDescription(description);
        note.setContent(content);
        this.em.persist(note);
    }

    //DELETE
    public void delete(Note note){
        em.remove(getNoteById(note.getId()));
    }
    public void deleteNoteById(Long id){
        em.remove(getNoteById(id));
    }

    public void shutdown() {
        this.em.flush();
        this.em.getTransaction().commit();
        this.em.close();
        this.emFactory.close();
    }
}
