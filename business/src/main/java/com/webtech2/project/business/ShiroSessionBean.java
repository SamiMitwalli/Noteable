package com.webtech2.project.business;

import com.webtech2.project.persistence.Notes;
import com.webtech2.project.persistence.Users;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.*;
import org.apache.shiro.config.IniSecurityManagerFactory;
import org.apache.shiro.mgt.SecurityManager;
//import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.util.Factory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import javax.annotation.PostConstruct;
import javax.ejb.Stateful;
import javax.json.JsonObject;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
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
    private Subject currentUser;
    private Users userEntity;
    //private Session session;

    /*REST-TEST-METHODEN*/
    @GET
    @Path("get")
    @Produces(MediaType.TEXT_PLAIN)
    public String get(){return "GET";}
    @GET
    @Path("authc")
    @Produces(MediaType.TEXT_PLAIN)
    public String authc(){return "authc";}
    @GET
    @Path("authcBasic")
    @Produces(MediaType.TEXT_PLAIN)
    public String authcBasic(){return "authcBasic";}
    @GET
    @Path("authc/admin")
    @Produces(MediaType.TEXT_PLAIN)
    public String adminTools(){return "Admin-Tools available.";}
    /*DATA-ACCESS-NOTES*/
    @POST
    @Path("user/createNote")
    @Consumes(MediaType.APPLICATION_JSON)//content
    @Produces(MediaType.TEXT_PLAIN)//success = id of Note || error = null
    public Long createNoteREST(JsonObject obj){
        Notes note = new Notes();
        note.setContent(obj.get("content").toString());
        note.setOwner(this.userEntity);
        Long id = this.createNote(note);
        log.info("created Note ["+id+"]");
        return id;
    }
    @GET
    @Path("user/readNotes")
    @Produces(MediaType.APPLICATION_JSON)//Array of Notes
    public List<Notes> readNotesREST(){
        return this.readNotes(userEntity.getId());
    }
    @POST
    @Path("user/updateNote")
    @Consumes(MediaType.APPLICATION_JSON)//id, content
    @Produces(MediaType.TEXT_PLAIN)//success = id of Note || error = null
    public Long updateNoteREST(JsonObject obj){
        if(this.currentUser.isPermitted(obj.get("id").toString())){
            Notes note = new Notes();
            note.setId(Long.parseLong(obj.get("id").toString()));
            note.setContent(obj.get("content").toString());
            note.setOwner(this.userEntity);
            Long id = this.updateNote(note);
            log.info("updated note ["+id+"]");
            return id;
        }
        log.info("Not permitted to update note ["+obj.get("id").toString()+"]");
        return null;
    }
    @POST
    @Path("user/deleteNote")
    @Consumes(MediaType.APPLICATION_JSON)//id of Note
    @Produces(MediaType.TEXT_PLAIN)//success = id of Note || error = null
    public Long deleteNoteREST(JsonObject obj){
        if(this.currentUser.isPermitted(obj.get("id").toString())) {
            Long id = this.deleteNote(Long.parseLong(obj.get("id").toString()));
            log.info("deleted note ["+id+"]");
            return id;
        }
        log.info("Not permitted to delete note ["+obj.get("id").toString()+"]");
        return null;
    }
    /*DATA-ACCESS-USERS*/
    @POST
    @Path("register")
    @Consumes(MediaType.APPLICATION_JSON)//loginName, password
    @Produces(MediaType.TEXT_PLAIN)//success = id of User || error = null
    public Long register(JsonObject obj){
        //VALIDATION
        if(this.validateLoginName(""+obj.get("loginName"))){
            Users user = new Users();
            user.setLoginName(obj.get("loginName").toString());
            user.setPassword(obj.get("password").toString());
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
        currentUser = SecurityUtils.getSubject();
        //session = currentUser.getSession();

        if (!this.currentUser.isAuthenticated()) {
            UsernamePasswordToken token = new UsernamePasswordToken(obj.get("loginName").toString(), obj.get("password").toString());
            token.setRememberMe(Boolean.valueOf(obj.get("remember").toString()));
            try{
                this.currentUser.login(token);
                log.info("user ["+this.currentUser.getPrincipal()+"] logged in successfully.");
                this.userEntity = this.findUserByName(""+this.currentUser.getPrincipal());
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
        log.info("user ["+this.currentUser.getPrincipal()+"] already logged in.");
        return false;
    }
    @POST
    @Path("user/changePassword")
    @Consumes(MediaType.APPLICATION_JSON)//id, password
    @Produces(MediaType.TEXT_PLAIN)//success = id of user || error = null
    public Long changePasswordREST(JsonObject obj) {
        //WARNING! UNSECURED
        if (this.currentUser.hasRole(obj.get("id").toString()) || this.currentUser.hasRole("admin")) {
            Users user = new Users();
            user.setLoginName(userEntity.getLoginName());
            user.setPassword(obj.get("password").toString());
            user.setId(userEntity.getId());
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
    @GET
    @Path("user/deleteAccount")
    @Consumes(MediaType.APPLICATION_JSON)//id (of user to be deleted)
    @Produces(MediaType.TEXT_PLAIN)//success = id of user || error = null
    public Long deleteAccount(JsonObject obj){
        if(this.currentUser.hasRole(obj.get("id").toString()) || this.currentUser.hasRole("admin")) {
            Long id = this.deleteUser(this.userEntity.getId());
            log.info("user account ["+obj.get("id").toString()+"] deleted");
            this.logout();
            return id;
        }
        log.info("you are not allowed to delete this account");
        return null;
    }
    /*ADMIN-TOOLS*/
    @POST
    @Path("admin/deleteNotes")
    @Consumes(MediaType.APPLICATION_JSON)//id (of user)
    @Produces(MediaType.TEXT_PLAIN)//success = 1 || error = null
    public Long deleteAllNotesREST(JsonObject user_obj){
        //Deletes All Notes of a specific User user_obj
        return this.deleteNotes(Long.parseLong(user_obj.get("id").toString()));
    }
    @GET
    @Path("admin/deleteUsers")
    @Produces(MediaType.TEXT_PLAIN)//success = 1 || error = null
    public Long deleteAllUsersREST(){
        //Deletes All Users from the Database
        return this.deleteUsers();
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
    private List<Notes> readNotes(Long id){
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
    private Long deleteNotes(Long user_id){
        List<Notes> notes = this.readNotes(user_id);
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
