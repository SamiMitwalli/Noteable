package com.webtech2.project.business;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import javax.ejb.Stateful;
import javax.persistence.*;

/**
 *
 * Created by Sami Mitwalli on 20.06.2016.
 */
@Stateful //Acts as Stateless SessionBean
public class HibernateConnector {
    EntityManager em;
    EntityManagerFactory emFactory;

    @PostConstruct
    public void onInit(){
        emFactory = Persistence.createEntityManagerFactory("noteable");
    }

    /*STARTUP-CONNECTION-TO-DATABASE*/
    /*PERSISTENCE INIT,COMMIT*/
    public void init(){
        //if(emFactory==null)
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
        if(this.emFactory!=null)
            this.emFactory.close();
    }
}
