package com.openclassrooms.mddapi.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.repository.UserRepository;

/**
 * UserDetailsService implementation class
 * @author Guillaume Belaud
 * @version 0.1
 */
@Service
public class UserDetailsServiceImpl implements UserDetailsService{

	/**
	 * @see com.openclassrooms.mddapi.repository.UserRepository.java
	 */
	@Autowired
	private UserRepository userRepo;

	/**
	 * find user by email address
	 * @param email 	string corresponding to email address
	 * @return			UserDetails object of the finding user
	 * @throws UsernameNotFoundException	if user could not be found with the param email
	 */
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		User user = userRepo.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User Not Found with email: " + email));

	    return UserDetailsImpl
	            .builder()
	            .id(user.getId())
	            .username(user.getEmail())
	            .name(user.getUserName())
	            .password(user.getPassword())
	            .build();
	}
}
