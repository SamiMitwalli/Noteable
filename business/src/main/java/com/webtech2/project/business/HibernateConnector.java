package com.webtech2.project.business;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.PersistenceContext;

/**
 *
 * Created by Sami Mitwalli on 20.06.2016.
 */
public class HibernateConnector {
    @PersistenceContext
    EntityManager em;
    EntityManagerFactory emFactory;

    /*PERSISTENCE INIT,COMMIT & SHUTDOWN*/
    public void init(){
        emFactory = Persistence.createEntityManagerFactory("noteable");
        em = emFactory.createEntityManager();
        em.getTransaction().begin();
    }

    public void commit(){
        this.em.flush();
        this.em.getTransaction().commit();
    }

    public void shutdown() {
        this.em.close();
        this.emFactory.close();
    }
}
