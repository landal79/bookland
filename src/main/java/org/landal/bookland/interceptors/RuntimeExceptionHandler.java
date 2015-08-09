package org.landal.bookland.interceptors;

import org.apache.deltaspike.core.api.exception.control.ExceptionHandler;
import org.apache.deltaspike.core.api.exception.control.Handles;
import org.apache.deltaspike.core.api.exception.control.event.ExceptionEvent;
import org.apache.deltaspike.core.util.ExceptionUtils;

@ExceptionHandler
public class RuntimeExceptionHandler {

    void printExceptions(@Handles ExceptionEvent<Exception> evt)
    {
        ExceptionUtils.throwAsRuntimeException(evt.getException());
        evt.handled();
        evt.getException().printStackTrace();
    }

}
