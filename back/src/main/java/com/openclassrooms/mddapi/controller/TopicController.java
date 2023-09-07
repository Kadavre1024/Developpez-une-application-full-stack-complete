package com.openclassrooms.mddapi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
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
	
	private ITopicService topicService;
	
	public TopicController(ITopicService topicService) {
		this.topicService = topicService;		
	}

	@GetMapping
	public List<TopicDto> getTopics() {
		return topicMapper.toDto(topicService.getTopics());
	}
	
	
}
