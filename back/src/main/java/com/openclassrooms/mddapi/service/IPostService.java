package com.openclassrooms.mddapi.service;

import java.util.List;

import com.openclassrooms.mddapi.model.Post;

public interface IPostService {

	List<Post> findAll();
	
	Post findById(Long post_id);
	
	Post create(Post post);
}
