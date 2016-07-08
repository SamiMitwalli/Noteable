package com.webtech2.project.business;

import org.apache.shiro.config.IniSecurityManagerFactory;
import org.apache.shiro.mgt.SecurityManager;
import org.apache.shiro.util.Factory;

import javax.annotation.PreDestroy;
import javax.ejb.Singleton;
import javax.ejb.Startup;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

/**
 * Created by Sami Mitwalli on 06.07.2016.
 */
@Singleton
@Startup
public class JPActivator {
    //EntityManagerFactory
    public static final EntityManagerFactory emFactory;
    static {
        try {
            emFactory = Persistence.createEntityManagerFactory("noteable");
            System.out.println("EntityManagerFactory - started");
        } catch (Throwable ex) {
            throw new ExceptionInInitializerError(ex);
        }
    }
    public static final Factory<SecurityManager> shiroFactory;
    static{
        try {
            shiroFactory = new IniSecurityManagerFactory("classpath:shiro.ini");
            System.out.println("ShiroFactory - started");
        } catch (Throwable ex) {
            throw new ExceptionInInitializerError(ex);
        }
    }

    /*SHUTDOWN-CONNECTION-TO-DATABASE*/
    @PreDestroy
    public void shutdown(){
        if(this.emFactory!=null) {
            this.emFactory.close();
            System.out.println("EntityManagerFactory - shutdown");
        }
        else{
            System.out.println("EntityManagerFactory == null");
        }
    }
}