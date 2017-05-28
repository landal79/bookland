package org.landal.bookland.google;

import org.apache.deltaspike.testcontrol.api.junit.CdiTestRunner;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.landal.bookland.model.Book;

import javax.inject.Inject;
import java.util.Collection;

@RunWith(CdiTestRunner.class)
public class GoogleBookClientTest {


    @Inject
    private GoogleBooksClient googleBooksClient;

    @Before
    public void setup() {

    }

    @Test
    public void test_find_with_title() throws Exception {
        Collection<Book> books = googleBooksClient.query(new QueryParams.Builder().withTitle("domain driven design").build());
        Assert.assertNotNull(books);
        Assert.assertFalse(books.isEmpty());
        books.forEach(b -> Assert.assertTrue(b.getTitle().toLowerCase().contains("domain")));
    }

}
