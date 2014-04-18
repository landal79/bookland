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
import org.landal.bookland.model.Book;
import org.landal.bookland.services.AuthorService;

@Path("/authors")
@RequestScoped
public class AuthorRestService {

	@Inject
	private AuthorService authorService;

	public AuthorRestService() {
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Author> getAll() {
		return authorService.getAll();
	}

	@GET
	@Path("{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Author getById(@PathParam("id") long id) {
		return authorService.findById(id);
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Author create(Author author) {
		return authorService.save(author);
	}

	@PUT
	@Path("{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Author update(Author author) {
		// TODO
		return null;
	}

	@DELETE
	@Path("{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public void remove(@PathParam("id") int id) {
		// TODO
	}

}
