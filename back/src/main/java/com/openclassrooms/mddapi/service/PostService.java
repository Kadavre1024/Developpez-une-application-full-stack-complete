package com.openclassrooms.mddapi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.model.Post;
import com.openclassrooms.mddapi.repository.PostRepository;

@Service
public class PostService implements IPostService {

	@Autowired
	private PostRepository postRepository;
	
	public List<Post> findAll() {
		return postRepository.findAll();
	}

	public Post findById(Long post_id) {
		return postRepository.findById(post_id).orElse(null);
	}
	
	public Post create(Post post) {
		return postRepository.save(post);
	}
	
}
