package org.landal.bookland.rest;

import java.io.IOException;
import java.io.OutputStream;
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
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.StreamingOutput;

import org.jboss.resteasy.annotations.providers.multipart.MultipartForm;
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
	public Book getById(@PathParam("id") long id) {
		return bookService.findById(id);
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Book create(Book book) {
		return bookService.save(book);
	}

	@POST
	@Path("/{id}/image")
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	public void uploadBookCover(@PathParam("id") Long id,
			@MultipartForm ImageUpload image) {
		Book book = bookService.findById(id);
		if (book == null) {
			throw new RuntimeException();
		}

		book.setImage(image.getData());
		bookService.save(book);
	}

	@GET
	@Path("/{id}/image")
	@Produces({ "image/*" })
	public Response getCoverImage(@PathParam("id") Long id) {

		final Book book = bookService.findById(id);
		if (book == null) {
			throw new RuntimeException();
		}

		return Response.ok().entity(new StreamingOutput() {
			@Override
			public void write(OutputStream output) throws IOException,
					WebApplicationException {
				output.write(book.getImage());
				output.flush();
			}
		}).build();
	}

	@PUT
	@Path("{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Book update(Book book) {
		return bookService.save(book);
	}

	@DELETE
	@Path("{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public void remove(@PathParam("id") int id) {
		// TODO
	}
}
