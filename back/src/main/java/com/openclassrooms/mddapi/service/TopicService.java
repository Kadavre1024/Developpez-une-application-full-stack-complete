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

@Service
public class TopicService implements ITopicService {

	@Autowired
	private TopicRepository topicRepository;
	
	@Autowired
	private UserRepository userRepository;

	@Override
	public List<Topic> getTopics() {
		return topicRepository.findAll();
	}

	@Override
	public Topic findById(Long topic_id) {
		return topicRepository.findById(topic_id).orElse(null);
	}
	
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
