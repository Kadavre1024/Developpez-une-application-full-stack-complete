package com.openclassrooms.mddapi.mapper;

import java.util.Arrays;
import java.util.Collections;
import java.util.Optional;
import java.util.stream.Collectors;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.openclassrooms.mddapi.dto.TopicDto;
import com.openclassrooms.mddapi.model.Topic;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.service.UserService;

/**
 * Topic Mapper class
 * @author Guillaume Belaud
 * @version 0.1
 */
@Component
@Mapper(componentModel = "spring", uses = {UserService.class}, imports = {Arrays.class, Collectors.class, Topic.class, User.class, Collections.class, Optional.class})
public abstract class TopicMapper implements EntityMapper<TopicDto, Topic> {

	/**
	 * @see com.openclassrooms.mddapi.service.UserService.java
	 */
	@Autowired
	UserService userService;
	
	
	/**
	 * Map a topicDto to its topic entity
	 * @param topicDto		TopicDto object
	 * @return				Topic object
	 */
	@Mappings({
		@Mapping(target = "users", expression = "java(Optional.ofNullable(topicDto.getUsers()).orElseGet(Collections::emptyList).stream().map(user_id -> { User user = this.userService.findById(user_id); if (user != null) { return user; } return null; }).collect(Collectors.toList()))"),
	})
	public abstract Topic toEntity(TopicDto topicDto);
	
	
	/**
	 * Map a topic to its Dto
	 * @param topic		Topic object
	 * @return			TopicDto object
	 */
	@Mappings({
        @Mapping(target = "users", expression = "java(Optional.ofNullable(topic.getUsers()).orElseGet(Collections::emptyList).stream().map(u -> u.getId()).collect(Collectors.toList()))"),
})
public abstract TopicDto toDto(Topic topic);
}
