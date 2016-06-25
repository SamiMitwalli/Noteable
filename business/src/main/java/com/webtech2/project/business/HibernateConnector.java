package com.webtech2.project.business;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import javax.ejb.DependsOn;
import javax.ejb.Startup;
import javax.ejb.Stateless;
import javax.persistence.*;

/**
 *
 * Created by Sami Mitwalli on 20.06.2016.
 */
@Stateless //Acts as Stateless SessionBean
public class HibernateConnector {
    EntityManager em;
    EntityManagerFactory emFactory;

    /*STARTUP-CONNECTION-TO-DATABASE*/
    @PostConstruct
    public void onCreate(){
        emFactory = Persistence.createEntityManagerFactory("noteable");
    }

    /*PERSISTENCE INIT,COMMIT*/
    public void init(){
        em = emFactory.createEntityManager();
        em.getTransaction().begin();
    }

    public void commit(){
        this.em.flush();
        this.em.getTransaction().commit();
        this.em.close();
    }

    /*SHUTDOWN-CONNECTION-TO-DATABASE*/
    @PreDestroy
    public void shutdown(){
        this.emFactory.close();
    }
}
