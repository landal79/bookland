package org.landal.bookland.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

@Entity
@Table(name = "TAGS", uniqueConstraints = @UniqueConstraint(columnNames = { "NAME" }))
@NamedQueries({ @NamedQuery(name = Tag.FIND_BY_NAME, query = "select t from Tag t where t.name = :name") })
public class Tag extends BaseEntity {

    private static final long serialVersionUID = 1L;

    public static final String FIND_BY_NAME = "Tag.findByName";

    @Column(name = "NAME", nullable = false, updatable = false)
    private String name;

    public Tag() {
    }

    public Tag(String name) {
        super();
        this.name = name;
    }

    // /////////////////////////////////////7

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}
