package com.webtech2.project.business;

import com.webtech2.project.persistence.Notes;
import com.webtech2.project.persistence.Users;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.*;
import org.apache.shiro.config.IniSecurityManagerFactory;
import org.apache.shiro.mgt.SecurityManager;
//import org.apache.shiro.session.Session;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.util.Factory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import javax.annotation.PostConstruct;
import javax.ejb.Stateful;
import javax.json.Json;
import javax.json.JsonObject;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import javax.print.attribute.standard.Media;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

/**
 *
 * Created by Sami Mitwalli on 26.06.2016.
 */
@Path("/access")
@Stateful
public class ShiroSessionBean extends HibernateConnector{
    private static final transient Logger log = LoggerFactory.getLogger(ShiroSessionBean.class);
    private Subject currentUser = SecurityUtils.getSubject();
    private Session session = currentUser.getSession();

    @GET
    @Path("connection")
    @Produces(MediaType.TEXT_PLAIN)
    public String connectionTest(){
        return "connection established!";
    }
    @GET
    @Path("auth")
    @Produces(MediaType.TEXT_PLAIN)
    public String authenticationTest(){
        if(this.currentUser==null)
            return "CurrentUser=null";
        if(this.currentUser.isAuthenticated())
            return "CurrentUser ["+this.currentUser.getPrincipal().toString()+"] is authenticated: id "+this.session.getAttribute("id").toString();
        else
            return "CurrentUser is not authenticated!";

    }
    /*DATA-ACCESS-NOTES*/
    @POST
    @Path("user/createNote")
    @Consumes(MediaType.APPLICATION_JSON)//content
    @Produces(MediaType.TEXT_PLAIN)//success = id of Note || error = null
    public Long createNoteREST(JsonObject obj){
        Notes note = new Notes();
        note.setContent(obj.getString("content"));
        note.setOwner(this.findUserByName(this.currentUser.getPrincipal().toString()));
        Long id = this.createNote(note);
        log.info("created Note ["+id+"]");
        return id;
    }
    @GET
    @Path("user/readNotes")
    @Produces(MediaType.APPLICATION_JSON)//Array of Notes
    public List<Notes> readNotesREST(){
        if(this.currentUser.isAuthenticated())
            return this.readNotesOf(Long.parseLong(this.session.getAttribute("id").toString()));
        else
            return null;
    }
    @POST
    @Path("user/updateNote")
    @Consumes(MediaType.APPLICATION_JSON)//id, content
    @Produces(MediaType.TEXT_PLAIN)//success = id of Note || error = null
    public Long updateNoteREST(JsonObject obj){
        log.info("user ["+this.currentUser.getPrincipal()+"] is about to update note ["+obj.getInt("id")+"]");
        if(this.currentUser.isPermitted(""+obj.getInt("id"))){
            Notes note = new Notes();
            note.setId(Long.parseLong(""+obj.getInt("id")));
            note.setContent(obj.getString("content"));
            note.setOwner(this.findUserByName(this.currentUser.getPrincipal().toString()));
            Long id = this.updateNote(note);
            log.info("user ["+this.currentUser.getPrincipal()+"] updated note ["+id+"]");
            return id;
        }
        log.info("user ["+this.currentUser.getPrincipal()+"] is not permitted to update note ["+obj.getInt("id")+"]");
        return null;
    }
    @POST
    @Path("user/deleteNote")
    @Consumes(MediaType.APPLICATION_JSON)//id of Note
    @Produces(MediaType.TEXT_PLAIN)//success = id of Note || error = null
    public Long deleteNoteREST(JsonObject obj){
        log.info("user ["+this.currentUser.getPrincipal()+"] is about to delete note ["+obj.getInt("id")+"]");
        if(this.currentUser.isPermitted(""+obj.getInt("id"))) {
            Long id = this.deleteNote(Long.parseLong(""+obj.getInt("id")));
            log.info("deleted note ["+id+"]");
            return id;
        }
        log.info("user ["+this.currentUser.getPrincipal()+"] is not permitted to delete note ["+obj.getInt("id")+"]");
        return null;
    }
    /*DATA-ACCESS-USERS*/
    @POST
    @Path("register")
    @Consumes(MediaType.APPLICATION_JSON)//loginName, password
    @Produces(MediaType.TEXT_PLAIN)//success = id of User || error = null
    public Long register(JsonObject obj){
        log.info("validating loginName");
        //VALIDATION
        if(this.validateLoginName(obj.getString("loginName"))){
            Users user = new Users();
            user.setLoginName(obj.getString("loginName"));
            user.setPassword(obj.getString("password"));
            //REGISTRATION
            log.info("new user is getting registrated");
            return this.createUser(user);
        }
        log.info("loginName is already existing");
        return null;
    }
    @POST
    @Path("login")
    @Consumes(MediaType.TEXT_PLAIN)//loginName, password, remember("true" or "false")
    @Produces(MediaType.TEXT_PLAIN)//success = "true" || error = "false"
    public boolean login(JsonObject obj){

        if (!this.currentUser.isAuthenticated()) {
            UsernamePasswordToken token = new UsernamePasswordToken(obj.getString("loginName"), obj.getString("password"));
            token.setRememberMe(obj.getBoolean("remember"));
            try{
                this.currentUser.login(token);
                log.info("user ["+this.currentUser.getPrincipal().toString()+"] logged in successfully.");
                log.info("retrieving user-information");
                this.session.setAttribute("id", this.findUserByName(""+this.currentUser.getPrincipal().toString()).getId());
                log.info("users database-id: "+this.session.getAttribute("id").toString());
                return true;
            }
            catch(UnknownAccountException u){
                log.info("Account not found in Database.");
            }
            catch(AuthenticationException e){
                log.info("login failed. username or password invalid.");
                //log.info(""+e);
                return false;
            }
        }
        log.info("user ["+this.currentUser.getPrincipal().toString()+"] already logged in.");
        return false;
    }
    @POST
    @Path("user/changePassword")
    @Consumes(MediaType.APPLICATION_JSON)//id, password
    @Produces(MediaType.TEXT_PLAIN)//success = id of user || error = null
    public Long changePasswordREST(JsonObject obj) {
        log.info("user ["+this.currentUser.getPrincipal()+"] is about to change his/her password");
        //WARNING! UNSECURED
        if (this.currentUser.hasRole(""+obj.getInt("id")) || this.currentUser.hasRole("admin")) {
            Users user = new Users();
            user.setLoginName(this.currentUser.getPrincipal().toString());
            user.setPassword(obj.getString("password"));
            user.setId(Long.parseLong(this.session.getAttribute("id").toString()));
            log.info("changing password");
            return this.updateUser(user);
        }
        log.info("password can not be changed");
        return null;
    }
    @GET
    @Path("user/logout")
    @Produces(MediaType.TEXT_PLAIN)//success = 1 || error = null
    public Long logout(){
        if(this.currentUser!=null) {
            if(this.currentUser.isAuthenticated()) {
                this.currentUser.logout();
                log.info("logged out");
                return (long)1;
            }
        }
        log.info("you have to be logged in, to logout");
        return null;
    }
    @POST
    @Path("user/deleteAccount")//[admin] can delete a specific user. user can delete him/herself
    @Consumes(MediaType.APPLICATION_JSON)//id (of user to be deleted)
    @Produces(MediaType.TEXT_PLAIN)//success = id of user || error = null
    public Long deleteAccount(JsonObject obj){
        log.info("user ["+this.currentUser.getPrincipal()+"] is about to delete Account ["+obj.getInt("id")+"]");
        if(this.currentUser.hasRole(""+obj.getInt("id")) || this.currentUser.hasRole("admin")) {
            Long id = this.deleteUser(Long.parseLong(this.session.getAttribute("id").toString()));
            log.info("user account ["+obj.getInt("id")+"] deleted");
            if(!this.currentUser.hasRole("admin"))
                this.logout();
            return id;
        }
        log.info("you are not allowed to delete account ["+obj.getInt("id")+"]");
        return null;
    }
    /*ADMIN-TOOLS*/
    @POST
    @Path("admin/deleteAllNotesOf")
    @Consumes(MediaType.APPLICATION_JSON)//id (of user)
    @Produces(MediaType.TEXT_PLAIN)//success = 1 || error = null
    public Long deleteAllNotesOfREST(JsonObject user_obj){
        //Deletes All Notes of a specific User user_obj
        return this.deleteNotesOf(Long.parseLong(""+user_obj.getInt("id")));
    }
    @POST
    @Path("admin/deleteAllNotes")
    @Consumes(MediaType.APPLICATION_JSON)//id (of user)
    @Produces(MediaType.TEXT_PLAIN)//success = 1 || error = null
    public Long deleteAllNotesREST(JsonObject user_obj){
        //Deletes All Notes of a specific User user_obj
        return this.deleteAllNotes();
    }
    @GET
    @Path("admin/deleteAllUsers")
    @Produces(MediaType.TEXT_PLAIN)//success = 1 || error = null
    public Long deleteAllUsersREST(){
        //Deletes All Users from the Database
        return this.deleteUsers();
    }
    @GET
    @Path("admin/readAllUsers")
    @Produces(MediaType.APPLICATION_JSON)//List of all Users (except the admin, who is not in the database)
    public List<Users> readAllUsersREST(){
        return this.readUsers();
    }
    @GET
    @Path("admin/readAllNotes")
    @Produces(MediaType.APPLICATION_JSON)//List of all Notes
    public List<Notes> readAllNotesREST(){
        return this.readNotes();
    }
    /*NOTES-DATABASE-QUERIES*/
    private Long createNote(Notes note){
            this.init();
            this.em.persist(note);
            this.commit();
            return note.getId();
    }
    private Notes readNote(Long id){
        this.init();
        Notes note = em.find(Notes.class, id);
        this.commit();
        return note;
    }
    private List<Notes> readNotesOf(Long id){
        //returns all Notes of the logged in subject
        this.init();
        CriteriaBuilder builder = emFactory.getCriteriaBuilder();

        CriteriaQuery<Notes> query = builder.createQuery(Notes.class);
        Root<Notes> root = query.from(Notes.class);
        query.select(root);
        query.where(builder.equal(root.get("owner_id"), id ));

        List<Notes> notes = em.createQuery(query).getResultList();
        this.commit();
        return notes;
    }
    private List<Notes> readNotes(){
        //returns all Notes
        this.init();
        CriteriaBuilder builder = emFactory.getCriteriaBuilder();

        CriteriaQuery<Notes> query = builder.createQuery(Notes.class);
        Root<Notes> root = query.from(Notes.class);
        query.select(root);

        List<Notes> notes = em.createQuery(query).getResultList();
        this.commit();
        return notes;
    }
    private Long updateNote(Notes note){
        //verify existence->merge/update note
        if(this.readNote(note.getId())!=null) {
            this.init();
            this.em.merge(note);
            this.commit();
            return note.getId();
        }
        //else return null
        else {
            return null;
        }
    }
    private Long deleteNote(Long id){
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
    private Long deleteNotesOf(Long user_id){
        List<Notes> notes = this.readNotesOf(user_id);
        this.init();
        try{
            for(Notes note : notes){
                this.em.remove(note);
            }
            this.commit();
        }
        catch (Exception e){
            return null;
        }
        return (long)1;
    }
    private Long deleteAllNotes(){
        List<Notes> notes = this.readNotes();
        this.init();
        try{
            for(Notes note : notes){
                this.em.remove(note);
            }
            this.commit();
        }
        catch (Exception e){
            return null;
        }
        return (long)1;
    }
    /*USERS-DATABASE-QUERIES*/
    private Long createUser(Users user) {
        if(user.getId()==null) {
            this.init();
            this.em.persist(user);
            this.commit();
            return user.getId();
        }//eigentlich überflüssig im Context
        else {
            return this.updateUser(user);
        }
    }
    private Users readUser(Long id){
        this.init();
        Users user = em.find(Users.class, id);
        this.commit();
        return user;
    }
    private List<Users> readUsers(){
        this.init();
        CriteriaBuilder builder = emFactory.getCriteriaBuilder();

        CriteriaQuery<Users> query = builder.createQuery(Users.class);
        Root<Users> root = query.from(Users.class);
        query.select(root);

        List<Users> users = em.createQuery(query).getResultList();
        this.commit();
        return users;
    }
    private Long updateUser(Users user){
        if(this.readUser(user.getId())!=null) {
            this.init();
            this.em.merge(user);
            this.commit();
            return user.getId();
        }
        else {
            return null;
        }
    }
    private Long deleteUser(Long id){
        this.init();
        Users user = em.getReference(Users.class, id);
        if(user!=null) {
            this.em.remove(user);
            this.commit();
            return user.getId();
        }
        else {
            return null;
        }
    }
    private Long deleteUsers(){
        List<Users> users = this.readUsers();
        this.init();
        try{
            for(Users user : users){
                this.em.remove(user);
            }
            this.commit();
        }
        catch (Exception e){
            return null;
        }
        return (long)1;
    }
    private boolean validateLoginName(String loginName) {
    /*RETURNS false if loginName=null, it's length=0 or already exists in DB*/
        if(loginName!= null && loginName.length()>0) {
            if (this.findUserByName(loginName)==null)
                return true;
        }
        return false;
    }
    private Users findUserByName(String loginName){
        this.init();
        CriteriaBuilder builder = emFactory.getCriteriaBuilder();
        //QUERY
        CriteriaQuery<Users> query = builder.createQuery(Users.class);
        Root<Users> root = query.from(Users.class);
        query.select(root);
        query.where(builder.equal(root.get("loginName"), loginName));

        List<Users> users = em.createQuery(query).getResultList();
        if(!users.isEmpty())
            return users.get(0);
        return null;
    }
    /*SHIRO-SESSION-BEAN-INITIALIZATION*/
    @PostConstruct
    public void onInit(){
        Factory<SecurityManager> factory = new IniSecurityManagerFactory("classpath:shiro.ini");
        SecurityManager securityManager = factory.getInstance();
        SecurityUtils.setSecurityManager(securityManager);
    }
}
