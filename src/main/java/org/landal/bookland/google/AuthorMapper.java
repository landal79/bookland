package org.landal.bookland.google;

import org.landal.bookland.model.Author;

import javax.enterprise.context.ApplicationScoped;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@ApplicationScoped
public class AuthorMapper {

    private final Pattern PATTERN_AUTHOR = Pattern.compile("(\\w.*) (\\w.*)");

    public Author asAuthor(final String author) {
        Matcher matcher = PATTERN_AUTHOR.matcher(author);
        if(matcher.find()) {
            return Author.newInstance(matcher.group(1), matcher.group(2));
        }

        return null;

    }
}
