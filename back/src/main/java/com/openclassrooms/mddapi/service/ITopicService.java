package com.openclassrooms.mddapi.service;

import java.util.List;

import com.openclassrooms.mddapi.model.Topic;

/**
 * Topic service interface
 * @author Guillaume Belaud
 * @version 0.1
 */
public interface ITopicService {

	List<Topic> getTopics();
	
	Topic findById(Long topic_id);
	
	void subscribe(Long id, Long userId);
	
	void unSubscribe(Long id, Long userId);

}
