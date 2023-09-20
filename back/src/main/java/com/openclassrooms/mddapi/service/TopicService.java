package com.openclassrooms.mddapi.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.exceptions.BadRequestException;
import com.openclassrooms.mddapi.exceptions.NotFoundException;
import com.openclassrooms.mddapi.model.Topic;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.repository.TopicRepository;
import com.openclassrooms.mddapi.repository.UserRepository;

/**
 * Topic service class
 * @author Guillaume Belaud
 * @version 0.1
 */
@Service
public class TopicService implements ITopicService {

	/**
	 * see com.openclassrooms.mddapi.repository.TopicRepository.java
	 */
	@Autowired
	private TopicRepository topicRepository;
	
	/**
	 * see com.openclassrooms.mddapi.repository.UserRepository.java
	 */
	@Autowired
	private UserRepository userRepository;

	/**
	 * Get the list of all topics
	 * @return list of Topic objects
	 */
	@Override
	public List<Topic> getTopics() {
		return topicRepository.findAll();
	}

	/**
	 * find a topic by id
	 * @param topic_id the id of the searched topic
	 * @return the finding Topic object
	 */
	@Override
	public Topic findById(Long topic_id) {
		return topicRepository.findById(topic_id).orElse(null);
	}
	
	/**
	 * subscribe to a topic
	 * @param id the topic id
	 * @param userId the subscribing user id
	 */
	@Override
	public void subscribe(Long id, Long userId) {
        Topic topic = this.topicRepository.findById(id).orElse(null);
        User user = this.userRepository.findById(userId).orElse(null);
        if (topic == null || user == null) {
            throw new NotFoundException();
        }

        boolean alreadySubscribe = topic.getUsers().stream().anyMatch(o -> o.getId().equals(userId));
        if(alreadySubscribe) {
            throw new BadRequestException();
        }

        topic.getUsers().add(user);

        this.topicRepository.save(topic);
    }

	/**
	 * Unsubscribe to a topic
	 * @param id the topic id
	 * @param userId the unsubscribing user id
	 */
	@Override
    public void unSubscribe(Long id, Long userId) {
        Topic topic = this.topicRepository.findById(id).orElse(null);
        if (topic == null) {
            throw new NotFoundException();
        }

        boolean alreadySubscribe = topic.getUsers().stream().anyMatch(o -> o.getId().equals(userId));
        if(!alreadySubscribe) {
            throw new BadRequestException();
        }

        topic.setUsers(topic.getUsers().stream().filter(user -> !user.getId().equals(userId)).collect(Collectors.toList()));

        this.topicRepository.save(topic);
    }
	
}
