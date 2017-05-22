package org.landal.bookland.google;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.*;

public class BookResourceTest {


    private BookResourceClient bookResourceClient;

    @Before
    public void setup() {
        bookResourceClient = new BookResourceClient();
        bookResourceClient.onPostConstruct();
    }

    @Test
    public void test_find_by_name() throws Exception {
        String response = bookResourceClient.findByName("domain driven design");
        Assert.assertNotNull(response);
    }

}
