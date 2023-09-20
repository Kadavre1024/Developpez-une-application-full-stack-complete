package com.openclassrooms.mddapi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.model.Post;
import com.openclassrooms.mddapi.repository.PostRepository;

/**
 * Post service class
 * @author Guillaume Belaud
 * @version 0.1
 */
@Service
public class PostService implements IPostService {

	/**
	 * @see com.openclassrooms.mddapi.repository.PostRepository.java
	 */
	@Autowired
	private PostRepository postRepository;
	
	/**
	 * find all posts
	 * @return list of Post objects
	 */
	@Override
	public List<Post> findAll() {
		return postRepository.findAll();
	}

	/**
	 * find a post by id
	 * @param post_id the id of the searched post
	 * @return the finding Post object
	 */
	@Override
	public Post findById(Long post_id) {
		return postRepository.findById(post_id).orElse(null);
	}
	
	/**
	 * create a new post
	 * @param post the Post object to create
	 * @return the created Post object
	 */
	@Override
	public Post create(Post post) {
		return postRepository.save(post);
	}
	
}
