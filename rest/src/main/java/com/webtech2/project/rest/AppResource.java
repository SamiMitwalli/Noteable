package com.webtech2.project.rest;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ejb.Stateless;
/**
 * Created by Sami Mitwalli on 08.06.2016.
 *
 */
@Path("/test")
@Stateless
public class AppResource {

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String getString(){
        return "-RESTful-Service-";
    }
}
