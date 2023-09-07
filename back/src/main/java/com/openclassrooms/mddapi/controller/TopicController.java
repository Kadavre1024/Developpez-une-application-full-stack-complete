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

@RestController
@RequestMapping("api/topic")
public class TopicController {
	
	@Autowired
	private TopicMapper topicMapper;
	
	@Autowired
	private ITopicService topicService;

	@GetMapping
	public List<TopicDto> getTopics() {
		return topicMapper.toDto(topicService.getTopics());
	}
	
	@GetMapping("/{id}")
	public TopicDto getTopicById(@PathVariable("id") String id) {
		return topicMapper.toDto(topicService.findById(Long.parseLong(id)));
	}
	
	@PostMapping("{id}/subscribe/{userId}")
    public ResponseEntity<?> subscribe(@PathVariable("id") String id, @PathVariable("userId") String userId) {
        try {
            topicService.subscribe(Long.parseLong(id), Long.parseLong(userId));

            return ResponseEntity.ok().build();
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().build();
        }
    }

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
