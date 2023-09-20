package com.openclassrooms.mddapi.service;

import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.repository.UserRepository;

/**
 * User service class
 * @author Guillaume Belaud
 * @version 0.1
 */
@Service
public class UserService {

	/**
	 * see com.openclassrooms.mddapi.repository.UserRepository.java
	 */
	private UserRepository userRepository;
	
	public UserService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	/**
	 * Find user by id
	 * @param userId the user id
	 * @return the finding User object
	 */
	public User findById(Long userId) {
		return userRepository.findById(userId).orElse(null);
	}

	/**
	 * Delete a user by id
	 * @param userId the user id
	 */
	public void delete(long userId) {
		userRepository.deleteById(userId);
		
	}
	
	/**
	 * Find a user by email address
	 * @param email the user email address
	 * @return the finding User object
	 */
	public User findByEmail(String email) {
		return userRepository.findByEmail(email).orElse(null);
	}
	
	/**
	 * Verify if user exist by email
	 * @param email the user email address
	 * @return true user exist with email address else false
	 */
	public boolean existByEmail(String email) {
		return userRepository.existsByEmail(email);
	}
	
	/**
	 * Register a new user
	 * @param user User object to be registered
	 */
	public void register(User user) {
		userRepository.save(user);
	}
}
