package com.openclassrooms.mddapi.security;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.repository.UserRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService{

	@Autowired
	private UserRepository userRepo;

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
