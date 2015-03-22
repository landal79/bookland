package org.landal.bookland.repositories;

import java.util.List;

import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;

import org.landal.bookland.model.Tag;

@Stateless
@LocalBean
@TransactionAttribute(TransactionAttributeType.REQUIRED)
public class TagRepository extends PersistenceRepository<Tag> {

    public TagRepository() {
        super(Tag.class);
    }

    /**
     * FIXME: to many rows for select all query
     *
     * @return
     */
    public List<Tag> getAll() {
        return getManager().createQuery("FROM Tag", Tag.class).getResultList();
    }

    public Tag findByName(String name) {
        return getManager().createNamedQuery(Tag.FIND_BY_NAME, Tag.class).setParameter("name", name).getSingleResult();
    }

}
