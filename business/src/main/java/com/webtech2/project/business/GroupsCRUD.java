package com.webtech2.project.business;

import com.webtech2.project.persistence.*;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

/**
 * Created by Sami Mitwalli on 20.06.2016.
 *
 */
@Path("/Groups")
public class GroupsCRUD extends JAXRS{

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String test(){
        return "GroupsCRUD is working!";
    }

    /*DATABASE QUERIES*/
    public void create(){

    }
    public void read(){

    }
    public void update(){

    }
    public void delete(){

    }
}
