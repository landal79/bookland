package org.landal.bookland.services;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;

import java.io.IOException;
import java.net.URL;

import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.StringUtils;
import org.jboss.arquillian.container.test.api.Deployment;
import org.jboss.arquillian.container.test.api.RunAsClient;
import org.jboss.arquillian.junit.Arquillian;
import org.jboss.arquillian.junit.InSequence;
import org.jboss.shrinkwrap.api.Archive;
import org.jboss.shrinkwrap.api.ShrinkWrap;
import org.jboss.shrinkwrap.api.asset.EmptyAsset;
import org.jboss.shrinkwrap.api.spec.WebArchive;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.landal.bookland.model.Book;
import org.landal.bookland.rest.BookRestService;

@RunWith(Arquillian.class)
public class BookRestServiceTest {

	@Deployment
	public static Archive<?> createDeployment() {
		return ShrinkWrap
				.create(WebArchive.class, "test.war")
				.addPackages(true, Book.class.getPackage(),
						BookService.class.getPackage(),
						BookRestService.class.getPackage())
				.addAsWebInfResource(EmptyAsset.INSTANCE, "beans.xml");
//				.setWebXML("web.xml");
	}

	@Test
	@RunAsClient
	// <-- this makes the test method run in client mode
	@InSequence(0)
	public void test_from_client_side() throws IOException {

		URL bookland = new URL("http://localhost:8080/test/rest/books");
		String result = IOUtils.toString(bookland.openStream(), "UTF-8");

		assertNotNull(result);
		assertFalse(StringUtils.isEmpty(result));

	}

}
