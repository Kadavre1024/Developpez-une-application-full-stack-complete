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

/**
 * Post Controller
 * @author Guillaume Belaud
 * @version 0.1
 */
@RestController
@RequestMapping("api/post")
public class PostController {
	
	/**
	 * @see com.openclassrooms.mddapi.mapper.PostMapper.java
	 */
	@Autowired
	private PostMapper postMapper;
	
	/**
	 * @see com.openclassrooms.mddapi.service.PostService.java
	 */
	@Autowired
	private IPostService postService;
	
	
	/**
	 * Get the list of all posts
	 * @return		httpResponse status 200 with the list of all post objects in database
	 */
	@GetMapping
	public ResponseEntity<?> findAllPosts(){
		return ResponseEntity.ok().body(postMapper.toDto(postService.findAll()));
	}
	
	
	/**
	 * Get a post informations by id
	 * @param id	string corresponding to the post id to get
	 * @return		httpResponse status 200 with post Dto object if post is valid
	 * 				else return status 404
	 * 				or status 400 if NumberFormatException
	 */
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
	
	
	/**
	 * Create a new post
	 * @param postDto	Object containing all post params for creation
	 * @return			httpResponse status 200 with post Dto object of the created post
	 */
	@PostMapping()
    public ResponseEntity<?> create(@Valid @RequestBody PostDto postDto) {
        Post post = postService.create(postMapper.toEntity(postDto));
        return ResponseEntity.ok().body(postMapper.toDto(post));
    }
}
