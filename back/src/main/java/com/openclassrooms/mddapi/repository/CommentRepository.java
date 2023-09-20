package com.openclassrooms.mddapi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.openclassrooms.mddapi.model.Comment;

/**
 * Comment repository interface
 * @author Guillaume Belaud
 * @version 0.1
 */
@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

	public List<Comment> findAllByPostId(Long post_id);
}
