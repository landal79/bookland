package org.landal.bookland.rest;

import java.util.List;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.landal.bookland.model.Author;
import org.landal.bookland.model.Tag;
import org.landal.bookland.repositories.TagRepository;

@Path("/tags")
@RequestScoped
public class TagRestService {

	@Inject
	private TagRepository tagRepository;

	public TagRestService() {
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Tag> getAll() {
		return tagRepository.getAll();
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Tag create(Tag tag) {
		return tagRepository.persist(tag);
	}

	@DELETE
	@Path("{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public void remove(@PathParam("id") int id) {
		// TODO
	}


}
