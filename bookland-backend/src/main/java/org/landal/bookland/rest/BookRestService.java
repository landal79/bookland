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

import org.landal.bookland.model.Book;
import org.landal.bookland.services.BookService;

@Path("/books")
@RequestScoped
public class BookRestService {

	@Inject
	private BookService bookService;

	public BookRestService() {
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<Book> getAll() {
		return bookService.getAll();
	}

	@GET
	@Path("{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Book getById(@PathParam("id") int id) {
		// TODO
		return null;
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Book create(Book book) {
		// TODO
		return null;
	}

	@PUT
	@Path("{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Book update(Book user) {
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
