package com.openclassrooms.mddapi.mapper;

import org.mapstruct.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.openclassrooms.mddapi.dto.CommentDto;
import com.openclassrooms.mddapi.model.Comment;
import com.openclassrooms.mddapi.model.Post;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.service.PostService;
import com.openclassrooms.mddapi.service.UserService;

/**
 * Comment Mapper class
 * @author Guillaume Belaud
 * @version 0.1
 */
@Component
@Mapper(componentModel = "spring", uses = {UserService.class}, imports = {Post.class, User.class})
public abstract class CommentMapper implements EntityMapper<CommentDto, Comment> {
	
	/**
	 * @see com.openclassrooms.mddapi.service.PostService.java
	 */
	@Autowired
	PostService postService;
	
	/**
	 * @see com.openclassrooms.mddapi.service.UserService.java
	 */
	@Autowired
	UserService userService;
	
	
	/**
	 * Map a commentDto to its comment entity
	 * @param commentDto	CommentDto object
	 * @return				Comment object
	 */
	@Mappings({
        @Mapping(target = "post", expression = "java(commentDto.getPost_id() != null ? this.postService.findById(commentDto.getPost_id()) : null)"),
        @Mapping(target = "user", expression = "java(commentDto.getUser_id() != null ? this.userService.findById(commentDto.getUser_id()) : null)"),
	})
	public abstract Comment toEntity(CommentDto commentDto);


	/**
	 * Map a comment to its Dto
	 * @param comment	Comment object
	 * @return			CommentDto object
	 */
	@Mappings({
        @Mapping(source = "comment.post.id", target = "post_id"),
        @Mapping(source = "comment.user.id", target = "user_id"),
	})
	public abstract CommentDto toDto(Comment comment);

}
