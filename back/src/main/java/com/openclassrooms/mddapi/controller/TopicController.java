package com.openclassrooms.mddapi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.dto.TopicDto;
import com.openclassrooms.mddapi.mapper.TopicMapper;
import com.openclassrooms.mddapi.service.ITopicService;

/**
 * Topic Controller
 * @author Guillaume Belaud
 * @version 0.1
 */
@RestController
@RequestMapping("api/topic")
public class TopicController {
	
	/**
	 * @see com.openclassrooms.mddapi.mapper.TopicMapper.java
	 */
	@Autowired
	private TopicMapper topicMapper;
	
	/**
	 * @see com.openclassrooms.mddapi.service.TopicService.java
	 */
	@Autowired
	private ITopicService topicService;

	
	/**
	 * Get the list of all topics
	 * @return		httpResponse status 200 with the list of all topics in the database
	 */
	@GetMapping("/all")
	public List<TopicDto> getTopics() {
		return topicMapper.toDto(topicService.getTopics());
	}
	
	
	/**
	 * Get a topic by id
	 * @param id	string corresponding to a topic id to find
	 * @return		httpResponse status 200 with topic Dto object of the found topic
	 */
	@GetMapping("/{id}")
	public TopicDto getTopicById(@PathVariable("id") String id) {
		return topicMapper.toDto(topicService.findById(Long.parseLong(id)));
	}
	
	
	/**
	 * Subscribe to a topic
	 * @param id		string corresponding to a topic id to subscribe
	 * @param userId	string corresponding to a user id to subscribe
	 * @return			httpResponse status 200 if subscription is valid
	 * 					else return status 400 for a NumberFormatException
	 */
	@PostMapping("{id}/subscribe/{userId}")
    public ResponseEntity<?> subscribe(@PathVariable("id") String id, @PathVariable("userId") String userId) {
        try {
            topicService.subscribe(Long.parseLong(id), Long.parseLong(userId));

            return ResponseEntity.ok().build();
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().build();
        }
    }
	
	
	/**
	 * Unsubscribe to a topic
	 * @param id		string corresponding to a topic id to unsubscribe
	 * @param userId	string corresponding to a user id to unsubscribe
	 * @return			httpResponse status 200 if unsubscription is valid
	 * 					else return status 400 for a NumberFormatException
	 */
    @DeleteMapping("{id}/subscribe/{userId}")
    public ResponseEntity<?> unsubscribe(@PathVariable("id") String id, @PathVariable("userId") String userId) {
        try {
            topicService.unSubscribe(Long.parseLong(id), Long.parseLong(userId));

            return ResponseEntity.ok().build();
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().build();
        }
    }
	
}
