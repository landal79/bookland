package org.landal.bookland.model;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.Lob;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.xml.bind.annotation.XmlRootElement;

import org.apache.commons.lang3.builder.ToStringBuilder;

@XmlRootElement(name = "book")
@Entity
@Table(name = "BOOKS")
@NamedQueries({ @NamedQuery(name = Book.DELETE_ALL, query = "delete from Book"),
        @NamedQuery(name = Book.DELETE, query = "delete from Book b where b.id = :id") })
public class Book extends BaseEntity {

    private static final long serialVersionUID = 1L;

    public static final String DELETE_ALL = "Book.deleteAll";
    public static final String DELETE = "Book.delete";

    private String isbn;
    private String title;
    private String description;
    private Integer stars;

    @Temporal(TemporalType.DATE)
    private Date publishingDate;

    @OneToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "BOOKS_AUTHOR", joinColumns = { @JoinColumn(name = "BOOK_ID", referencedColumnName = "ID") }, inverseJoinColumns = { @JoinColumn(name = "AUTHOR_ID", referencedColumnName = "ID", unique = true) })
    private List<Author> authors;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "BOOK_TAG", joinColumns = { @JoinColumn(name = "BOOK_ID", referencedColumnName = "ID") }, inverseJoinColumns = { @JoinColumn(name = "TAG_ID", referencedColumnName = "ID") })
    private Set<Tag> tags;

    @Lob
    @Basic(fetch = FetchType.LAZY)
    private byte[] image;

    @Lob
    @Basic(fetch = FetchType.LAZY)
    private String review;

    protected Book() {
    }

    public Book(String isbn, String title, String description, Author... authors) {
        this.isbn = isbn;
        this.title = title;
        this.description = description;
        this.authors = Arrays.asList(authors);
    }

    public Book(Long id, String isbn, String title, String description, Author... authors) {
        super(id);
        this.isbn = isbn;
        this.title = title;
        this.description = description;
        this.authors = Arrays.asList(authors);
    }

    public String toString() {
        return new ToStringBuilder(this).append("id", getId()).append("isbn", getIsbn()).toString();
    }

    public void addAuthor(@NotNull Author author) {
        if (authors == null) {
            authors = new ArrayList<>();
        }
        authors.add(author);
    }

    public void addTag(@NotNull Tag tag) {
        if (tags == null) {
            tags = new HashSet<>();
        }
        tags.add(tag);
    }

    // ///////////////////////////////77

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
        if (authors == null) {
            authors = new ArrayList<Author>();
        }
        return Collections.unmodifiableList(authors);
    }

    public void setAuthors(List<Author> authors) {
        this.authors = authors;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public Collection<Tag> getTags() {
        if (tags == null) {
            tags = new HashSet<>();
        }
        return Collections.unmodifiableSet(tags);
    }

    public void setTags(Set<Tag> tags) {
        this.tags = tags;
    }

    public Date getPublishingDate() {
        return publishingDate;
    }

    public void setPublishingDate(Date publishingDate) {
        this.publishingDate = publishingDate;
    }

    public String getReview() {
        return review;
    }

    public void setReview(String review) {
        this.review = review;
    }

    public Integer getStars() {
        return stars;
    }

    public void setStars(Integer stars) {
        this.stars = stars;
    }

}
