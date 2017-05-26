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

        private QueryParams build() {
           return new QueryParams(this);
        }

    }

    private String query;

    private QueryParams(Builder builder) {
        StringBuilder queryBuilder = new StringBuilder();

        if (StringUtils.isNotBlank(builder.author)) {
            queryBuilder.append(PREFIX_AUTHOR).append(builder.author);
        }

        if (StringUtils.isNotBlank(builder.isbn)) {
            queryBuilder.append(PREFIX_ISBN).append(builder.isbn);
        }

        if (StringUtils.isNotBlank(builder.title)) {
            queryBuilder.append(PREFIX_TITLE).append(builder.title);
        }

        this.query = builder.query;
    }

    @Override
    public String toString() {
        return query;
    }

    public String getQuery() {
        return query;
    }


}

