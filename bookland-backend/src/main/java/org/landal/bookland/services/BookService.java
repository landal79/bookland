package org.landal.bookland.services;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.EntityManager;

import org.landal.bookland.model.Author;
import org.landal.bookland.model.Book;

@Stateless
@LocalBean
public class BookService {

	@Inject
	private EntityManager em;

	public static List<Book> books;

	static {
		books = Collections.synchronizedList(new ArrayList<Book>());

		Author author = new Author(1L, "name","surname");

		books.add(new Book(1L, "isbn1", "title1", "description1", author));
		books.add(new Book(2L, "isbn2", "title2", "description2", author));
		books.add(new Book(3L, "isbn3", "title3", "description3", author));
		books.add(new Book(4L, "isbn4", "title4", "description4", author));
		books.add(new Book(5L, "isbn5", "title5", "description5", author));

	}

	public void persist(Book book){
		em.persist(book);
	}

	public List<Book> getAll() {
		return Collections.unmodifiableList(books);
	}



}
