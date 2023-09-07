package com.openclassrooms.mddapi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.model.Comment;
import com.openclassrooms.mddapi.repository.CommentRepository;

@Service
public class CommentService {

	@Autowired
	private CommentRepository repo;
	
	public List<Comment> findAllByPost(Long postId){
		return repo.findAllByPostId(postId);
	}
	
	public Comment findById(Long id) {
		return repo.findById(id).orElse(null);
	}
	
	public Comment create(Comment comment) {
		return repo.save(comment);
	}
}
