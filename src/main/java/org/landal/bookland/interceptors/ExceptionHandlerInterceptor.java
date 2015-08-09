package org.landal.bookland.interceptors;


import org.apache.deltaspike.core.api.exception.control.event.ExceptionToCatchEvent;

import javax.enterprise.event.Event;
import javax.inject.Inject;
import javax.interceptor.AroundInvoke;
import javax.interceptor.Interceptor;
import javax.interceptor.InvocationContext;

@Interceptor @ExceptionHandling
public class ExceptionHandlerInterceptor {

    @Inject
    private Event<ExceptionToCatchEvent> catchEvent;

    @AroundInvoke
    public Object aroundInvoke(InvocationContext ctx) throws Exception {
        try{
            return ctx.proceed();
        } catch (Exception e){
            catchEvent.fire(new ExceptionToCatchEvent(e));
           return null;
        }
    }

}
