package org.landal.bookland.services;

import java.util.List;

import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import org.landal.bookland.model.Author;

@Stateless
@LocalBean
public class AuthorService {

	@Inject
	private EntityManager em;

	public void persist(Author author) {
		em.persist(author);
	}

	public List<Author> getAll() {
		CriteriaBuilder cb = em.getCriteriaBuilder();
		CriteriaQuery<Author> q = cb.createQuery(Author.class);
//		Root<Author> c = q.from(Author.class);
		TypedQuery<Author> query = em.createQuery(q);
		return query.getResultList();
	}

	public int cancelAll() {
		Query deleteQuery = em.createNamedQuery(Author.DELETE);
		return deleteQuery.executeUpdate();

	}

	public Author save(Author author) {
		return em.merge(author);
	}

	public Author findById(long id) {
		return em.find(Author.class, id);
	}

}
