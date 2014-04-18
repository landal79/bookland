package org.landal.bookland.model;

import java.io.Serializable;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

import org.apache.commons.lang3.builder.ToStringBuilder;

@XmlRootElement(name = "book")
@Entity
@Table(name = "BOOKS")
@NamedQueries({ @NamedQuery(name = Book.DELETE_ALL, query = "delete from Book") })
public class Book implements Serializable {

	private static final long serialVersionUID = 1L;

	public static final String DELETE_ALL = "Book.delete";

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	private String isbn;
	private String title;
	private String description;

	@OneToMany(fetch = FetchType.EAGER)
	//@JoinColumn(name = "AUTHOR_ID", referencedColumnName = "ID")
	@JoinTable(
	      name="BOOKS_AUTHOR",
	      joinColumns={ @JoinColumn(name="BOOK_ID", referencedColumnName="ID") },
	      inverseJoinColumns={ @JoinColumn(name="AUTHOR_ID", referencedColumnName="ID", unique=true) }
	)
	private List<Author> authors;

	public Book() {
	}

	public Book(Long id, String isbn, String title, String description,
			Author... authors) {
		super();
		this.id = id;
		this.isbn = isbn;
		this.title = title;
		this.description = description;
		this.authors = Arrays.asList(authors);
	}

	public String toString() {
		return new ToStringBuilder(this).append("id", id).append("isbn", isbn)
				.toString();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getIsbn() {
		return isbn;
	}

	public void setIsbn(String isbn) {
		this.isbn = isbn;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public List<Author> getAuthors() {
		return Collections.unmodifiableList(authors);
	}

	public void setAuthors(List<Author> authors) {
		this.authors = authors;
	}

}
