package com.openclassrooms.mddapi.service;

import java.util.List;

import com.openclassrooms.mddapi.model.Post;

/**
 * Post service interface
 * @see com.openclassrooms.mddapi.service.PostService.java
 * @author Guillaume Belaud
 * @version 0.1
 */
public interface IPostService {

	List<Post> findAll();
	
	Post findById(Long post_id);
	
	Post create(Post post);
}
