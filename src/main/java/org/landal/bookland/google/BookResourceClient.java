package org.landal.bookland.google;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.PostConstruct;
import javax.enterprise.context.ApplicationScoped;
import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.WebTarget;
import javax.ws.rs.core.Response;

@ApplicationScoped
public class BookResourceClient {

    private static final Logger LOGGER = LoggerFactory.getLogger(BookResourceClient.class);

    private static final String BASE_URL = "https://www.googleapis.com/books/v1";

    private Client restClient;
    private WebTarget volumeResource;

    @PostConstruct
    public void onPostConstruct() {
        restClient = ClientBuilder.newClient();
        volumeResource = restClient.target(BASE_URL);
    }

    public String findByName(String name) {
        Response response = volumeResource.path("volumes")
                .queryParam("q",name)
                .request()
                .get();
        return response.readEntity(String.class);
    }
}
