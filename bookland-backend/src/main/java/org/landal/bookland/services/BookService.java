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

import org.landal.bookland.model.Book;

@Stateless
@LocalBean
public class BookService {


	@Inject
	private EntityManager em;

	public void persist(Book book) {
		em.persist(book);
	}

	public List<Book> getAll() {
		CriteriaBuilder cb = em.getCriteriaBuilder();
		CriteriaQuery<Book> q = cb.createQuery(Book.class);
		Root<Book> c = q.from(Book.class);
		TypedQuery<Book> query = em.createQuery(q);
		return query.getResultList();
	}

	public int cancelAll() {
		Query deleteQuery = em.createNamedQuery(Book.DELETE_ALL);
		return deleteQuery.executeUpdate();

	}

	public Book save(Book book) {
		return em.merge(book);
	}

	public Book findById(long id) {
		return em.find(Book.class, id);
	}

}
