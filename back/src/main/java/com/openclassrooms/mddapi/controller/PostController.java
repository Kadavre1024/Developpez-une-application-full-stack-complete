package com.openclassrooms.mddapi.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.dto.PostDto;
import com.openclassrooms.mddapi.mapper.PostMapper;
import com.openclassrooms.mddapi.model.Post;
import com.openclassrooms.mddapi.service.IPostService;

@RestController
@RequestMapping("api/post")
public class PostController {
	
	@Autowired
	private PostMapper postMapper;
	
	@Autowired
	private IPostService postService;

	@GetMapping
	public ResponseEntity<?> findAllPosts(){
		return ResponseEntity.ok().body(postMapper.toDto(postService.findAll()));
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> findById(@PathVariable("id") String id){
		try {
            Post post = postService.findById(Long.valueOf(id));

            if (post == null) {
                return ResponseEntity.notFound().build();
            }

            return ResponseEntity.ok().body(postMapper.toDto(post));
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().build();
        }
	}
	
	@PostMapping()
    public ResponseEntity<?> create(@Valid @RequestBody PostDto postDto) {
        Post post = postService.create(postMapper.toEntity(postDto));
        return ResponseEntity.ok().body(postMapper.toDto(post));
    }
}
