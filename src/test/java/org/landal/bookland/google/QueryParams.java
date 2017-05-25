package org.landal.bookland.google;

import com.google.common.base.Preconditions;
import org.apache.commons.lang3.StringUtils;

import java.util.List;

public class QueryParams {

    private static final String PREFIX_AUTHOR = "inauthor:";
    private static final String PREFIX_TITLE = "intitle:";
    private static final String PREFIX_ISBN = "isbn:";

    public static class Builder {

        private String title;
        private String author;
        private String isbn;
        private String query;

        public Builder() {

        }

        public Builder title(String title) {
            Preconditions.checkArgument(StringUtils.isNotBlank(title));
            this.title = title;
            return this;
        }

        public Builder author(String author) {
            Preconditions.checkArgument(StringUtils.isNotBlank(author));
            this.author = author;
            return this;
        }

        public Builder isbn(String isbn) {
            Preconditions.checkArgument(StringUtils.isNotBlank(isbn));
            this.isbn = isbn;
            return this;
        }

        private void build() {
            StringBuilder query = new StringBuilder();

            if (StringUtils.isNotBlank(author)) {
                query.append(PREFIX_AUTHOR).append(author);
            }

            if (StringUtils.isNotBlank(isbn)) {
                query.append(PREFIX_ISBN).append(isbn);
            }

            if (StringUtils.isNotBlank(title)) {
                query.append(PREFIX_TITLE).append(title);
            }

           // return query.toString();
        }

    }

    private String intitle;
    private String author;
    private String isbn;

    private QueryParams(String intitle, String author, String isbn) {
        this.intitle = intitle;
        this.author = author;
        this.isbn = isbn;
    }

    String toQueryString() {
        StringBuilder query = new StringBuilder();

        if (StringUtils.isNotBlank(author)) {
            query.append(PREFIX_AUTHOR).append(author);
        }

        if (StringUtils.isNotBlank(isbn)) {
            query.append(PREFIX_ISBN).append(isbn);
        }

        if (StringUtils.isNotBlank(intitle)) {
            query.append(PREFIX_TITLE).append(intitle);
        }

        return query.toString();
    }


}

