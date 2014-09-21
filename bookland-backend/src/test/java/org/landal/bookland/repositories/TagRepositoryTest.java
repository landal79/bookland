package org.landal.bookland.repositories;

import static org.hamcrest.CoreMatchers.notNullValue;
import static org.junit.Assert.assertThat;

import javax.inject.Inject;

import org.jboss.arquillian.container.test.api.Deployment;
import org.jboss.arquillian.junit.Arquillian;
import org.jboss.arquillian.persistence.ShouldMatchDataSet;
import org.jboss.arquillian.transaction.api.annotation.TransactionMode;
import org.jboss.arquillian.transaction.api.annotation.Transactional;
import org.jboss.shrinkwrap.api.ShrinkWrap;
import org.jboss.shrinkwrap.api.asset.EmptyAsset;
import org.jboss.shrinkwrap.api.asset.StringAsset;
import org.jboss.shrinkwrap.api.spec.WebArchive;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.landal.bookland.model.Tag;
import org.landal.bookland.utils.CoreDeployments;
import org.landal.bookland.utils.PersistenceDeployments;

@Transactional(TransactionMode.COMMIT)
@RunWith(Arquillian.class)
public class TagRepositoryTest {

	@Deployment
	public static WebArchive deploy() {
		return ShrinkWrap
				.create(WebArchive.class)
				.addAsLibraries(
						CoreDeployments.persistenceRepository().addAsManifestResource(
								new StringAsset(PersistenceDeployments.descriptor().exportAsString()),
								"persistence.xml")).addAsWebInfResource(EmptyAsset.INSTANCE, "beans.xml");
	}

	@Inject
	private Repository<Tag> tagRepository;

	@Test
	@ShouldMatchDataSet(value = { "tags.yml" }, excludeColumns = { "*id" })
	public void test_persist() {

		Tag tag = new Tag("popular");
		tag = tagRepository.persist(tag);

		assertThat(tag.getId(), notNullValue());

	}

}
