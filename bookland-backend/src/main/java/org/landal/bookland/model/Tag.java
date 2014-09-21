package org.landal.bookland.model;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "TAGS")
public class Tag extends BaseEntity {

	private static final long serialVersionUID = 1L;

	private String name;

	public Tag() {
	}


	public Tag(String name) {
		super();
		this.name = name;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}



}
