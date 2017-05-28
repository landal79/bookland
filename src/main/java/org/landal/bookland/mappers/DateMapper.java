package org.landal.bookland.mappers;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.LoggerFactory;

import javax.enterprise.context.Dependent;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.regex.Pattern;

@Dependent
public class DateMapper {

    private static final org.slf4j.Logger LOGGER = LoggerFactory.getLogger(DateMapper.class);

    public static final String PATTERN_FORMAT_DATE = "\\d{4}\\-\\d{2}\\-\\d{2}";
    public static final String PATTERN_FORMAT_YEAR = "\\d{4}";

    Pattern PATTERN_DATE = Pattern.compile(PATTERN_FORMAT_DATE);
    Pattern PATTERN_YEAR = Pattern.compile(PATTERN_FORMAT_YEAR);

    public String asString(Date date) {
        LOGGER.trace("Converting date to string: {}", date == null ? "[empty]": date);
        return date != null ? dateFormat().format( date ) : null;
    }

    public Date asDate(String date) {

        LOGGER.trace("Converting string to date: {}", StringUtils.defaultString(date, "[empty]"));

        if(date == null) {
            return null;
        }

        DateFormat dateFormat = null;
        if (matches(date, PATTERN_FORMAT_DATE)){
            dateFormat = dateFormat();
        } else if (matches(date, PATTERN_FORMAT_YEAR)) {
            dateFormat = yearFormat();
        } else {
            throw new RuntimeException("Invalid date format: " + date);
        }

        try {
            return dateFormat.parse( date );
        }
        catch ( ParseException e ) {
            throw new RuntimeException( e );
        }
    }

    private boolean matches(String input, String pattern) {
        return Pattern.matches(pattern, input);
    }

    private DateFormat dateFormat() {
        DateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        format.setLenient(true);
        return format;
    }


    private DateFormat yearFormat() {
        DateFormat format = new SimpleDateFormat("yyyy");
        return format;
    }
}
