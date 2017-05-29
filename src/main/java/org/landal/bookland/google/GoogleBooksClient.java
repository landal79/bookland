package org.landal.bookland.google;

import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.books.Books;
import com.google.api.services.books.Books.Volumes.List;
import com.google.api.services.books.BooksRequestInitializer;
import com.google.api.services.books.model.Volume;
import com.google.api.services.books.model.Volumes;
import org.landal.bookland.model.Book;
import org.slf4j.LoggerFactory;
import org.slf4j.bridge.SLF4JBridgeHandler;

import javax.annotation.PostConstruct;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.net.URLEncoder;
import java.text.NumberFormat;
import java.util.Collection;
import java.util.Collections;
import java.util.Objects;
import java.util.logging.Level;
import java.util.logging.LogManager;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@ApplicationScoped
public class GoogleBooksClient {

    private static final org.slf4j.Logger LOGGER = LoggerFactory.getLogger(GoogleBooksClient.class);

    static {
      //  LogManager.getLogManager().reset();
        SLF4JBridgeHandler.removeHandlersForRootLogger();
        SLF4JBridgeHandler.install();
        //Logger.getLogger("global").setLevel(Level.FINEST);
    }

    private static final String APPLICATION_NAME = "bookland/v1.0";

    private static final NumberFormat CURRENCY_FORMATTER = NumberFormat.getCurrencyInstance();
    private static final NumberFormat PERCENT_FORMATTER = NumberFormat.getPercentInstance();

    @Inject
    private GoogleBookMapper mapper;

    private Books booksClient;

    @PostConstruct
    private void onPostConstuct() {
        try {
            ClientCredentials.errorIfNotSpecified();

            JsonFactory jsonFactory = JacksonFactory.getDefaultInstance();
            // Set up Books client.
            booksClient = new Books.Builder(GoogleNetHttpTransport.newTrustedTransport(),
                     jsonFactory, null)
                    .setApplicationName(APPLICATION_NAME)
                    .setGoogleClientRequestInitializer(new BooksRequestInitializer(ClientCredentials.API_KEY))
                    .build();
        } catch(Exception e) {
            throw new RuntimeException(e);
        }

    }

    public Collection<Book> query(QueryParams params) throws Exception{
        Objects.requireNonNull(params);

        LOGGER.debug("Query string: {}", params);

        List volumesList = booksClient.volumes().list(params.getQuery());

        Volumes volumes = volumesList.execute();

        if (volumes.getTotalItems() == 0 || volumes.getItems() == null) {
            LOGGER.info("No books found for query: {}", params.getQuery());
            return Collections.emptyList();
        }

       return  volumes.getItems()
               .stream()
               .map(volume -> mapper.volumeToBook(volume))
               .collect(Collectors.toList());
    }

}
