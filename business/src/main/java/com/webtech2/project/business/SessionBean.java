package com.webtech2.project.business;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.config.IniSecurityManagerFactory;
import org.apache.shiro.mgt.SecurityManager;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.util.Factory;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.PostConstruct;
import javax.ejb.Stateful;
import javax.enterprise.context.SessionScoped;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.MediaType;

/**
 * Created by Sami Mitwalli on 26.06.2016.
 */
@Stateful
@Path("/access")
public class SessionBean {
    private static final transient Logger log = LoggerFactory.getLogger(SessionBean.class);

    SecurityManager securityManager;
    Subject currentUser;
    Session session;

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
        this.currentUser.logout();
        log.info("logged out");
    }

    @PostConstruct
    public void init(){
        Factory<SecurityManager> factory = new IniSecurityManagerFactory("classpath:shiro.ini");
        this.securityManager = factory.getInstance();
        SecurityUtils.setSecurityManager(this.securityManager);
    }
}
