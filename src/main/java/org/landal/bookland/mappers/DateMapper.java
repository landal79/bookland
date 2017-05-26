package org.landal.bookland.mappers;

import javax.enterprise.context.Dependent;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@Dependent
public class DateMapper {

    public static final String PATTERN = "yyyy-MM-dd";

    public String asString(Date date) {
        return date != null ? new SimpleDateFormat(PATTERN)
                .format( date ) : null;
    }

    public Date asDate(String date) {
        try {
            return date != null ? new SimpleDateFormat( PATTERN )
                    .parse( date ) : null;
        }
        catch ( ParseException e ) {
            throw new RuntimeException( e );
        }
    }
}
