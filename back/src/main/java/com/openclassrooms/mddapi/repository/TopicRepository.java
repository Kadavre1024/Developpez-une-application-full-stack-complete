package com.openclassrooms.mddapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.openclassrooms.mddapi.model.Topic;

/**
 * Topic repository interface
 * @author Guillaume Belaud
 * @version 0.1
 */
@Repository
public interface TopicRepository extends JpaRepository<Topic, Long> {

}
