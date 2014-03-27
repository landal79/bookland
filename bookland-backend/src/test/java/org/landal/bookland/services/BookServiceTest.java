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
import org.landal.bookland.resources.Resources;

@RunWith(Arquillian.class)
public class BookServiceTest {

	@Deployment
	public static Archive<?> createDeployment() {
		return ShrinkWrap
				.create(WebArchive.class, "test.war")
				.addPackages(true, Book.class.getPackage(),
						BookService.class.getPackage(), Resources.class.getPackage())
				.addAsManifestResource("test-persistence.xml",
						"persistence.xml")
				.addAsWebInfResource(EmptyAsset.INSTANCE, "beans.xml");
		// .setWebXML("web.xml");
	}

	@Inject
	private UserTransaction userTransaction;

	@Inject
	private BookService bookService;

	@Test
	public void test_get_all() throws Exception {

		userTransaction.begin();

		Book book = new Book() {

			private static final long serialVersionUID = 1L;

			{
				setIsbn("1111111111111111");
				setDescription("description");
				setTitle("title");
			}
		};

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
