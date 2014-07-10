package org.landal.bookland.services;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import java.util.List;

import javax.inject.Inject;
import javax.transaction.UserTransaction;

import org.jboss.arquillian.container.test.api.Deployment;
import org.jboss.arquillian.junit.Arquillian;
import org.jboss.shrinkwrap.api.Archive;
import org.jboss.shrinkwrap.api.ShrinkWrap;
import org.jboss.shrinkwrap.api.asset.EmptyAsset;
import org.jboss.shrinkwrap.api.spec.WebArchive;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.landal.bookland.model.Book;
import org.landal.bookland.resources.ResourcesProvider;

@RunWith(Arquillian.class)
public class BookServiceTest {

	@Deployment
	public static Archive<?> createDeployment() {
		return ShrinkWrap
				.create(WebArchive.class, "test.war")
				.addPackages(true, Book.class.getPackage(), BookService.class.getPackage(),
						ResourcesProvider.class.getPackage())
				.addAsResource("META-INF/test-persistence.xml", "META-INF/persistence.xml")
				.addAsWebInfResource(EmptyAsset.INSTANCE, "beans.xml").addAsWebInfResource("test-ds.xml")
				/*.addAsResource("import.sql")*/;
	}

	@Inject
	private UserTransaction userTransaction;

	@Inject
	private BookService bookService;

	@Test
	public void test_get_all() throws Exception {

//		userTransaction.begin();
//
//		bookService.cancelAll();
//
//		userTransaction.commit();
		userTransaction.begin();

		Book book = new Book();
		book.setIsbn("1111111111111111");
		book.setDescription("description");
		book.setTitle("title");

		bookService.persist(book);

		userTransaction.commit();
		userTransaction.begin();

		List<Book> allBooks = bookService.getAll();
		assertNotNull(allBooks);
		assertEquals(1, allBooks.size());

		book = allBooks.get(0);

		assertEquals("description", book.getDescription());
		assertEquals("1111111111111111", book.getIsbn());
		assertEquals("title", book.getTitle());

	}

}
