package org.landal.bookland.repositories;

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

}
