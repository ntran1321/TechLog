package data;

import java.util.List;
import java.util.Set;

import entities.Technology;
import entities.Topic;

public interface TechLogDAO {
	public List<Technology> index();
	public Technology show(int id);
	public Technology create(Technology technology);
	public Technology update(int id, Technology technology);
	public boolean destroy(int id);
	public List<Topic> indexTopics();
	public Set<Topic> showTopics(int id);
	public Topic createTopic(int id, Topic topic);
	public boolean destroyTopic(int id);
}