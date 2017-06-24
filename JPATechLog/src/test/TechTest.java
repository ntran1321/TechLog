package test;

import static org.junit.Assert.assertEquals;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import entities.Technology;
import entities.Topic;

public class TechTest {
	
	private EntityManager em = null;
	
	@Test
	public void test() {
		boolean pass = true;
		assertEquals(pass, true);
	}
	
	@Before
	public void setUp() throws Exception {
		EntityManagerFactory emf = Persistence.createEntityManagerFactory("TechLog");
		em = emf.createEntityManager();
	}
	
	@After
	public void tearDown() throws Exception {
		if (em != null) {
			em.close();
		}
	}
	
	@Test
	public void test_get_technology() {
		Technology technology = em.find(Technology.class, 1);
		assertEquals("JavaScript",technology.getName());
	}
	
	@Test
	public void test_get_topic() {
		Topic topic = em.find(Topic.class, 1);
		assertEquals("JQuery", topic.getName());
	}

}
