package com.openclassrooms.mddapi.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.userdetails.UserDetails;

import com.openclassrooms.mddapi.dto.UserDto;
import com.openclassrooms.mddapi.mapper.UserMapper;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.payload.JwtResponse;
import com.openclassrooms.mddapi.payload.LoginRequest;
import com.openclassrooms.mddapi.payload.MessageResponse;
import com.openclassrooms.mddapi.payload.RegisterRequest;
import com.openclassrooms.mddapi.security.JwtUtil;
import com.openclassrooms.mddapi.security.UserDetailsServiceImpl;
import com.openclassrooms.mddapi.service.UserService;

@RestController
@RequestMapping("api/auth")
public class AuthController {
	
	@Autowired
	private JwtUtil jwtUtil;
	
	@Autowired
	private AuthenticationManager authManager;
	
	@Autowired
	private UserDetailsServiceImpl userDetailsService;

	@Autowired
	private PasswordEncoder encoder;
	
	@Autowired
	private UserMapper userMapper;
	
	@Autowired
	private UserService userService;
	
	@PostMapping("/login")
	public ResponseEntity<?> loginUser(@Valid @RequestBody LoginRequest loginRequest){
		
		User user = userService.findByEmail(loginRequest.getEmail());
		
		if(user == null) {
			return ResponseEntity.badRequest().body(new MessageResponse("Error: invalid email"));
		}
		
		if(!encoder.matches(loginRequest.getPassword(), user.getPassword())) {
			return ResponseEntity.badRequest().body(new MessageResponse("Error: invalid password"));
		}
		
		Authentication authentication = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        final UserDetails userDetails = userDetailsService.loadUserByUsername(authentication.getName());
        String jwt = jwtUtil.generateToken(userDetails.getUsername());
        
		return ResponseEntity.ok(new JwtResponse(jwt, userDetails.getUsername()));
	}
	
	
	
	@PostMapping("/register")
	public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest registerRequest){
		
		if (userService.existByEmail(registerRequest.getEmail())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already taken!"));
        }
		
		User user = new User(
				registerRequest.getEmail(),
                registerRequest.getUsername(),
                encoder.encode(registerRequest.getPassword())
                );
		
		userService.register(user);
		
		return ResponseEntity.ok().body(new MessageResponse("User "+user.getUserName()+" is registered"));
	}
	
	@GetMapping("/me")
	public ResponseEntity<?> getUserDetails(Authentication auth){
		UserDto userAuth = userMapper.toDto(userService.findByEmail(auth.getName()))   ;
		return ResponseEntity.ok().body(userAuth);
	}
	
	
}
