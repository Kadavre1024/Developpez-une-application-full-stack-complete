package com.openclassrooms.mddapi.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.dto.CommentDto;
import com.openclassrooms.mddapi.mapper.CommentMapper;
import com.openclassrooms.mddapi.model.Comment;
import com.openclassrooms.mddapi.service.CommentService;

/**
 * Comment Controller
 * @author Guillaume Belaud
 * @version 0.1
 */
@RestController
@RequestMapping("api/comment")
public class CommentController {
	
	/**
	 * @see com.openclassrooms.mddapi.mapper.CommentMapper.java
	 */
	@Autowired
	private CommentMapper commentMapper;

	/**
	 * @see com.openclassrooms.mddapi.service.CommentService.java
	 */
	@Autowired
	private CommentService commentService;
	
	
	
	/**
	 * Get a comment by id
	 * @param id	string corresponding to comment id to get
	 * @return		httpResponse status 200 with comment Dto object
	 * 				else return status 400 for a NumberFormatException
	 * 				or status 404 if the id passed not corresponding to an existing comment
	 */
	@GetMapping("/{id}")
	public ResponseEntity<?> findByPostId(@PathVariable("id") String id){
		
		try {
            List<Comment> comments = commentService.findAllByPost(Long.valueOf(id));

            if (comments == null) {
                return ResponseEntity.notFound().build();
            }

            return ResponseEntity.ok().body(commentMapper.toDto(comments));
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().build();
        }
		
	}
	
	/**
	 * Create a new comment
	 * @param commentDto	Object containing the comment params
	 * @return				httpResponse status 200 with commentDto object of the created comment
	 */
	@PostMapping
	public ResponseEntity<?> create(@Valid @RequestBody CommentDto commentDto){
		Comment comment = commentService.create(commentMapper.toEntity(commentDto));
		return ResponseEntity.ok().body(commentMapper.toDto(comment));
	}
}
