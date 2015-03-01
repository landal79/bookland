package org.landal.bookland.repositories;

import org.landal.bookland.model.Identifiable;

public interface Repository<T extends Identifiable> {

    Class<T> getType();

    T persist(T entity);

    T get(String id);

    void remove(T entity);
}
