package org.landal.bookland.model;

import javax.persistence.Entity;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

import com.google.common.base.Preconditions;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.builder.ToStringBuilder;

@XmlRootElement(name = "author")
@Entity
@Table(name = "AUTHORS")
@NamedQueries({ @NamedQuery(name = Author.DELETE, query = "delete from Author") })
public class Author extends BaseEntity {

	private static final long serialVersionUID = 1L;

	public static final String DELETE = "Author.delete";

	public static final Author newInstance(String name, String surname) {
		Preconditions.checkArgument(StringUtils.isNotBlank(name));
		Preconditions.checkArgument(StringUtils.isNotBlank(surname));
		Author author = new Author();
		author.setName(name);
		author.setSurname(surname);
		return author;
	}

	private String name;
	private String surname;

	protected Author() {
	}

	public Author(Long id, String name, String surname) {
		super(id);
		this.name = name;
		this.surname = surname;
	}

	public String toString(){
		return ToStringBuilder.reflectionToString(this);
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}



}
