package com.openclassrooms.mddapi.service;

import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.repository.UserRepository;

@Service
public class UserService {

	private UserRepository userRepository;
	
	public UserService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	public User findById(Long userId) {
		return userRepository.findById(userId).orElse(null);
	}

	public void delete(long userId) {
		userRepository.deleteById(userId);
		
	}
}
