package org.landal.bookland.google;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

public class GoogleBookClientTest {


    private GoogleBooksClient googleBooksClient;

    @Before
    public void setup() {
        googleBooksClient = new GoogleBooksClient();
    }

    @Test
    public void test_find_by_name() throws Exception {
        googleBooksClient.query(new QueryParams.Builder().withTitle("domain driven design").build());
        Assert.assertTrue(true);
    }

}
