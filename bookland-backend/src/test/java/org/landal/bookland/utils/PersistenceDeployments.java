package org.landal.bookland.utils;

import org.jboss.shrinkwrap.descriptor.api.Descriptors;
import org.jboss.shrinkwrap.descriptor.api.persistence20.PersistenceDescriptor;

public class PersistenceDeployments {

	private static final String HIBERNATE_SHOW_SQL = "hibernate.show_sql";
	private static final String HIBERNATE_HBM2DDL_AUTO = "hibernate.hbm2ddl.auto";

	/**
	 * It builds the persistence xml programmatically
	 */
	public static PersistenceDescriptor descriptor() {
		return Descriptors.create(PersistenceDescriptor.class).createPersistenceUnit().name("test")
				.getOrCreateProperties().createProperty().name(HIBERNATE_HBM2DDL_AUTO).value("create-drop").up()
				.createProperty().name(HIBERNATE_SHOW_SQL).value("true").up().up()
				.jtaDataSource("java:jboss/datasources/ExampleDS").up();
	}

}
