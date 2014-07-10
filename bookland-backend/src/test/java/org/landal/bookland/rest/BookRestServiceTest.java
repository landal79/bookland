package org.landal.bookland.rest;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;

import java.io.IOException;
import java.net.URL;
import java.util.List;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.MediaType;

import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.StringUtils;
import org.jboss.arquillian.container.test.api.Deployment;
import org.jboss.arquillian.container.test.api.RunAsClient;
import org.jboss.arquillian.junit.Arquillian;
import org.jboss.arquillian.junit.InSequence;
import org.jboss.arquillian.test.api.ArquillianResource;
import org.jboss.resteasy.client.ClientRequest;
import org.jboss.resteasy.client.ClientResponse;
import org.jboss.resteasy.util.GenericType;
import org.jboss.shrinkwrap.api.Archive;
import org.jboss.shrinkwrap.api.ShrinkWrap;
import org.jboss.shrinkwrap.api.asset.EmptyAsset;
import org.jboss.shrinkwrap.api.spec.WebArchive;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.landal.bookland.model.Author;
import org.landal.bookland.model.Book;
import org.landal.bookland.resources.ResourcesProvider;
import org.landal.bookland.services.BookService;

@RunWith(Arquillian.class)
@RunAsClient
public class BookRestServiceTest {

	private static final String RESOURCE_PREFIX = JaxRsActivator.class.getAnnotation(ApplicationPath.class).value()
			.substring(1);

	@Deployment
	public static Archive<?> createDeployment() {
		return ShrinkWrap
				.create(WebArchive.class, "test.war")
				.addPackages(true, ResourcesProvider.class.getPackage(), Book.class.getPackage(),
						BookService.class.getPackage(), BookRestService.class.getPackage())
				.addAsResource("META-INF/test-persistence.xml", "META-INF/persistence.xml")
				.addAsWebInfResource(EmptyAsset.INSTANCE, "beans.xml").addAsWebInfResource("test-ds.xml")
				.addAsResource("import.sql");
		// .setWebXML("web.xml");
	}

	@ArquillianResource
	private URL deploymentUrl;

	@Test
	@InSequence(0)
	public void test_get_all_books_as_string() throws IOException {

		URL bookland = new URL(deploymentUrl.toString() + RESOURCE_PREFIX + "/books");
		String result = IOUtils.toString(bookland.openStream(), "UTF-8");

		assertNotNull(result);
		assertFalse(StringUtils.isEmpty(result));

	}

	@Test
	public void test_get_all_books() throws Exception {

		ClientRequest request = new ClientRequest(deploymentUrl.toString() + RESOURCE_PREFIX + "/books");
		request.header("Accept", MediaType.APPLICATION_JSON);

		List<Book> books = (List<Book>) request.get(new GenericType<List<Book>>() {}).getEntity();
		assertEquals(4, books.size());
		Book book = null;
		for (int i = 0; i < books.size(); i++) {
			book = books.get(i);
			assertEquals("isbn"+(i+1), book.getIsbn());
			assertEquals("title"+(i+1), book.getTitle());
			assertEquals("description"+(i+1), book.getDescription());
		}

	}

	@Test
	public void test_GetById() throws Exception {
		ClientRequest request = new ClientRequest(deploymentUrl.toString() + RESOURCE_PREFIX + "/books/1");
		request.header("Accept", MediaType.APPLICATION_JSON);

		ClientResponse<String> responseObj = request.get(String.class);
		assertEquals(200, responseObj.getStatus());
		Book book = responseObj.getEntity(Book.class);

		assertEquals("isbn1", book.getIsbn());
		assertEquals("title1", book.getTitle());
		assertEquals("description1", book.getDescription());

	}

	@Test
	public void test_GetById_1() throws Exception {
		ClientRequest request = new ClientRequest(deploymentUrl.toString() + RESOURCE_PREFIX + "/books/1");
		request.header("Accept", MediaType.APPLICATION_JSON);

		Book book = request.get(Book.class).getEntity();

		assertEquals("isbn1", book.getIsbn());
		assertEquals("title1", book.getTitle());
		assertEquals("description1", book.getDescription());

		assertNotNull(book.getAuthors());
		assertEquals(1, book.getAuthors().size());

		Author author = book.getAuthors().get(0);
		assertEquals("name", author.getName());
		assertEquals("surname", author.getSurname());

	}

}
