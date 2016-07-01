package com.webtech2.project.business;

import com.webtech2.project.persistence.Notes;
import com.webtech2.project.persistence.Users;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.*;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.Permission;
import org.apache.shiro.authz.annotation.RequiresAuthentication;
import org.apache.shiro.config.IniSecurityManagerFactory;
import org.apache.shiro.mgt.SecurityManager;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.realm.Realm;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.util.Factory;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.PostConstruct;
import javax.ejb.Stateful;
import javax.json.Json;
import javax.json.JsonObject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.Collection;
import java.util.Collections;

/**
 * Created by Sami Mitwalli on 26.06.2016.
 */
@Path("/access")
@Stateful
public class ShiroSessionBean{
    private static final transient Logger log = LoggerFactory.getLogger(ShiroSessionBean.class);
    UsersCRUD usersCRUD;
    NotesCRUD notesCRUD;

    SecurityManager securityManager;
    Subject currentUser;
    Users userEntity;
    Session session;

    /*Register-Login/-out-TEST*/
    @GET
    @Path("test")
    @Produces(MediaType.TEXT_PLAIN)
    public String test(){
        /*Alle informationen des Tests werden im log festgehalten, welches durch die
        * Console ausgegeben wird
        * Ablauf ist erstellen eines User, Validation, ob er in die Datenbank aufgenommen
        * werden darf (Username ist vergeben), login, Abfrage seiner Rollenberechtigung,
        * Abfrage nach seiner Permission und logout.
        *
        * In dieser Implementierung ist der einzutragene Name bereits vergeben, sodass eine
        * Registrierung nicht angenommen wird. Dannach versucht sich ein User mit unregistrierten
        * Namen einzuloggen. Dieser hat folglich keine Rechte und keine Permission.
        *
        * Der bereits registrierte User [user], kann sich einloggen. Jeder User aus der
        * Datenbank hat eigene individuelle Rechte, über die ihm Permissions zugeteilt werden.
        * Die Permissions sind definiert durch die Notes, von denen er "owner" ist.
        * (siehe permissionsQuery in der shiro.ini). Zuletzt loggt er sich aus
        *
        * Als letztes loggt sich der "root"-user ein. Dieser ist ausserhalb des Datenbank-Realms
        * definiert, in der shiro.ini/iniRealm. Der iniRealm ist eine vordefinierte Variable in shiro.
        * Dieser user, erhält innerhalb der shiro.ini admin-rollen-rechte definiert, durch die er
        * alle permissions besitzt. Am Ende loggt auch er sich aus.
        *
        *
        * [Die Console spuckt eine Warnung aus, bei welcher angegeben wird, dass es mehr als ein
        * Realm gibt (Datenbank-Realm und iniRealm) und shiro in der Datenbank den ersten und admin
        * nicht findet. Dies kann ignoriert werden. Ich nehme an, dass shiro beim login() zwei
        * Threads eröffnet und in beiden gleichzeitig sucht, da die Reihenfolge der Definition der Realms
        * innerhalb der shiro.ini keinen Unterschied macht.]
        */
        /*REGISTER_TEST
                    /*KNOWN ISSUE: saves a String "user" as ""user"" into the Database
                    * because of JsonObject building. Since only used for Test purpose
                    * =>Irrelevant to fix
                    * */

        JsonObject obj = Json.createObjectBuilder()
                .add("loginName","user")
                .add("password", "123456")
                .build();
        //this.register(obj);     //darf durch validation test nicht möglich sein

                    /*KNOWN ISSUE: IF YOU INJECT A USER DIRECTLY INTO (OUTSIDE THE WEBAPP) POSTGRESQL-DATABASE
                    * JPA WILL RESULT IN A CONSTRAIN ERROR
                    * */
        extendedTest("","");                //Login-Test for Not-Existing-User
        extendedTest("user","123456");      //Login-Test for Normal-User
        extendedTest("root","123456");      //Login-Test for Admin-User

        return "tested";
    }
    public void extendedTest(String loginName, String password){
        /*LOGIN_TEST*/
        this.login(loginName, password, true);
        if(currentUser.isAuthenticated()){
            /*Beispiel zum erstellen einer Notiz für einen User
            *CreateAccessDelete Note
            * */
            notesCRUD = new NotesCRUD();
            usersCRUD = new UsersCRUD();
            userEntity = usersCRUD.findByName(loginName);

            //erstelle Notiz im Namen des Users
            Notes note = new Notes();
            //Admin(userEntity==null).Regel muss noch entworfen werden(alle Notes die keinen owner haben? Oder neuen Account automatisch anlegen mit Admin Role?)
            if(userEntity!=null)
                note.setOwner(userEntity);
            note.setTitle("HelloNote");
            notesCRUD.create(note);

            /*ROLE_TEST*/
            if(userEntity!=null)
                if(this.currentUser.hasRole(""+userEntity.getId()))
                    log.info("["+currentUser.getPrincipal()+"] has his-own-rights ["+userEntity.getId()+"]");
                else
                    log.info("["+currentUser.getPrincipal()+"] has not his-own-rights");

            if(this.currentUser.hasRole("admin"))
                log.info("["+currentUser.getPrincipal()+"] has admin-rights");
            else
                log.info("["+currentUser.getPrincipal()+"] has no admin-rights");

            /*PERMISSION_TEST*/
            if(this.currentUser.isPermitted("everything you want"))
                log.info("["+currentUser.getPrincipal()+"] is permitted to everything you want");
            else
                log.info("["+currentUser.getPrincipal()+"] is not permitted to everything you want");

            if(this.currentUser.isPermitted(""+note.getId())){
                log.info("user is permitted to read Note ["+note.getId()+"]");
                //log.info(""+notesCRUD.read(note.getId()));
            }
            else
                log.info("user is not permitted to read Note ["+note.getId()+"]");

            log.info("deleting Note ["+note.getId()+"]...");
            notesCRUD.delete(note.getId());
            log.info("Note ["+note.getId()+"] deleted!");
            /*LOGOUT_TEST*/
            this.logout();
        }

    }

    /*USER-REST-SERVICES*/
    @POST
    @Path("register")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.TEXT_PLAIN)
    public Long register(JsonObject obj){
        usersCRUD = new UsersCRUD();
        //VALIDATION
        if(usersCRUD.validateLoginName(""+obj.get("loginName"))){
            //REGISTRATION
            log.info("registering new user");
            long id = usersCRUD.createUser(obj);
            log.info("registered user "+id);
            return id;
        }
        log.info("loginName already registered");
        return null;
    }

    @POST
    @Path("login")
    @Consumes(MediaType.TEXT_PLAIN)
    public boolean login(String username, String password, boolean remember){
        currentUser = SecurityUtils.getSubject();
        session = currentUser.getSession();

        if (!this.currentUser.isAuthenticated()) {
            UsernamePasswordToken token = new UsernamePasswordToken(username, password);
            token.setRememberMe(remember);
            try{
                this.currentUser.login(token);
                log.info("user ["+this.currentUser.getPrincipal()+"] logged in successfully.");
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
        return true;
    }

    @GET
    @Path("logout")
    public void logout(){
        if(this.currentUser!=null) {
            if(this.currentUser.isAuthenticated()) {
                this.currentUser.logout();
                log.info("logged out");
            }
        }
        log.info("you have to be logged in, to logout");
    }

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

    /*SHIRO-SESSION-BEAN-INITIALIZATION*/
    @PostConstruct
    public void onInit(){
        Factory<SecurityManager> factory = new IniSecurityManagerFactory("classpath:shiro.ini");
        this.securityManager = factory.getInstance();
        SecurityUtils.setSecurityManager(this.securityManager);
    }

}
