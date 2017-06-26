package data;

import java.util.List;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.transaction.annotation.Transactional;

import entities.Technology;
import entities.Topic;

@Transactional
public class TechLogDAOImpl implements TechLogDAO {

	@PersistenceContext
	private EntityManager em;

	@Override
	public List<Technology> index() {
		String qry = "Select t from Technology t";
		List<Technology> techs = em.createQuery(qry, Technology.class).getResultList();
		for (Technology t : techs) {
			Set<Topic> topics = t.getTopics();
			double total = 0;
			double score = 0;
			if (!topics.isEmpty()) {
				for (Topic topic : topics) {
					score += topic.getScore();
				}
				total = score / (topics.size() * 4);

				t.setTotalScore(Math.round(total *100));
			}
		}
		return techs;
	}

	@Override
	public Technology show(int id) {
		return em.find(Technology.class, id);
	}

	@Override
	public Technology create(Technology technology) {
		em.persist(technology);
		em.flush();
		return technology;
	}

	@Override
	public Technology update(int id, Technology technology) {
		Technology managedT = em.find(Technology.class, id);
		if (technology.getName() != null) {
			managedT.setName(technology.getName());
			managedT.setDescription(technology.getDescription());
			managedT.setTopics(technology.getTopics());
		}
		return managedT;
	}

	@Override
	public boolean destroy(int id) {
		try {
			em.remove(em.find(Technology.class, id));
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	@Override
	public List<Topic> indexTopics() {
		String qry = "Select t from Topic t";
		return em.createQuery(qry).getResultList();
	}

	@Override
	public Set<Topic> showTopics(int id) {
		try {
			String qry1 = "Select t from Technology t where t.id = :id";
			Technology t = em.createQuery(qry1, Technology.class).setParameter("id", id).getSingleResult();
			if (!t.getTopics().isEmpty()) {
				String qry = "Select t from Technology t join fetch t.topics where t.id = :id";
				System.out.println("****** Tech ID: " + id + "****");
				Technology tech = em.createQuery(qry, Technology.class).setParameter("id", id).getSingleResult();
				return tech.getTopics();
			} else {
				return null;
			}

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public Topic createTopic(int id, Topic topic) {
		Technology tech = em.find(Technology.class, id);
		topic.setTechnology(tech);
		System.out.println(topic.getTechnology().getDescription());
		em.persist(topic);
		return topic;
	}

	@Override
	public boolean destroyTopic(int id) {
		try {
			em.remove(em.find(Topic.class, id));
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	@Override
	public Topic updateTopic(int id, Topic topic) {
		Topic managedT = em.find(Topic.class, id);
		if (topic.getName() != null) {
			managedT.setName(topic.getName());
			managedT.setInformation(topic.getInformation());
			managedT.setScore(id);
			em.persist(managedT);
		}
		return managedT;
	}

}
