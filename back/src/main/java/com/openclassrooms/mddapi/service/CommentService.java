package com.openclassrooms.mddapi.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.model.Comment;
import com.openclassrooms.mddapi.repository.CommentRepository;

/**
 * Comment service class
 * @author Guillaume Belaud
 * @version 0.1
 */
@Service
public class CommentService {

	/**
	 * @see com.openclassrooms.mddapi.repository.CommentRepository.java
	 */
	@Autowired
	private CommentRepository repo;
	
	/**
	 * find all comments by post id
	 * @param postId long representing a post id
	 * @return list of Comment objects
	 */
	public List<Comment> findAllByPost(Long postId){
		return repo.findAllByPostId(postId);
	}
	
	/**
	 * find comment by id
	 * @param id representing a comment id
	 * @return the finding comment object
	 */
	public Comment findById(Long id) {
		return repo.findById(id).orElse(null);
	}
	
	/**
	 * create a new comment
	 * @param comment comment to create
	 * @return the created Comment object
	 */
	public Comment create(Comment comment) {
		return repo.save(comment);
	}
}
