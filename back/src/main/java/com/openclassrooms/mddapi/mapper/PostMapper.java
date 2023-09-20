package com.openclassrooms.mddapi.mapper;

import java.util.Arrays;
import java.util.Collections;
import java.util.Optional;
import java.util.stream.Collectors;

import org.mapstruct.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.openclassrooms.mddapi.dto.PostDto;
import com.openclassrooms.mddapi.model.Post;
import com.openclassrooms.mddapi.model.Topic;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.service.TopicService;
import com.openclassrooms.mddapi.service.UserService;

/**
 * Post Mapper class
 * @author Guillaume Belaud
 * @version 0.1
 */
@Component
@Mapper(componentModel = "spring", uses = {UserService.class}, imports = {Arrays.class, Collectors.class, Topic.class, User.class, Collections.class, Optional.class})
public abstract class PostMapper implements EntityMapper<PostDto, Post> {
	
	/**
	 * @see com.openclassrooms.mddapi.service.TopicService.java
	 */
	@Autowired
	TopicService topicService;
	
	/**
	 * @see com.openclassrooms.mddapi.service.UserService.java
	 */
	@Autowired
	UserService userService;
	
	
	/**
	 * Map a postDto to its post entity
	 * @param postDto	PostDto object
	 * @return			Post object
	 */
	@Mappings({
        @Mapping(target = "topic", expression = "java(postDto.getTopic_id() != null ? this.topicService.findById(postDto.getTopic_id()) : null)"),
        @Mapping(target = "user", expression = "java(postDto.getUser_id() != null ? this.userService.findById(postDto.getUser_id()) : null)"),
	})
	public abstract Post toEntity(PostDto postDto);


	/**
	 * Map a post to its Dto
	 * @param post		Post object
	 * @return			PostDto object
	 */
	@Mappings({
        @Mapping(source = "post.topic.id", target = "topic_id"),
        @Mapping(source = "post.user.id", target = "user_id"),
	})
	public abstract PostDto toDto(Post post);

}
