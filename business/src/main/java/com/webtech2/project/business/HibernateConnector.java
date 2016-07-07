package com.webtech2.project.business;

import javax.ejb.Stateful;
import javax.persistence.*;

/**
 *
 * Created by Sami Mitwalli on 20.06.2016.
 */
@Stateful
public class HibernateConnector {
    EntityManager em;
    EntityManagerFactory emFactory = JPActivator.emFactory;

    public void init(){
        em = emFactory.createEntityManager();
        em.getTransaction().begin();
    }

    public void commit(){
        this.em.flush();
        this.em.getTransaction().commit();
        this.em.close();
    }

}
