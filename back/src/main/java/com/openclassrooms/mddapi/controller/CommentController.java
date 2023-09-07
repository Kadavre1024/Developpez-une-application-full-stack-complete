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

@RestController
@RequestMapping("api/comment")
public class CommentController {
	
	@Autowired
	private CommentMapper commentMapper;

	@Autowired
	private CommentService commentService;
	
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
	
	@PostMapping
	public ResponseEntity<?> create(@Valid @RequestBody CommentDto commentDto){
		Comment comment = commentService.create(commentMapper.toEntity(commentDto));
		return ResponseEntity.ok().body(commentMapper.toDto(comment));
	}
}
