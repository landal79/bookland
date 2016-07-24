package org.landal.bookland.utils;

import org.jboss.shrinkwrap.api.ShrinkWrap;
import org.jboss.shrinkwrap.api.asset.EmptyAsset;
import org.jboss.shrinkwrap.api.spec.JavaArchive;
import org.landal.bookland.model.Identifiable;
import org.landal.bookland.repositories.PersistenceRepository;
import org.landal.bookland.repositories.Repository;
import org.landal.bookland.resources.ResourcesProvider;

public class CoreDeployments {
	public static JavaArchive core() {
		return ShrinkWrap.create(JavaArchive.class)
				.addPackages(false, Identifiable.class.getPackage(), Repository.class.getPackage(), ResourcesProvider.class.getPackage())
				.addAsManifestResource(EmptyAsset.INSTANCE, "beans.xml");
	}

    public static JavaArchive persistenceRepository() {
        return core().addPackages(false, PersistenceRepository.class.getPackage());
    }

}
