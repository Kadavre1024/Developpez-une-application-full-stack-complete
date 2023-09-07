package com.openclassrooms.mddapi.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.payload.LoginRequest;
import com.openclassrooms.mddapi.payload.MessageResponse;
import com.openclassrooms.mddapi.payload.RegisterRequest;
import com.openclassrooms.mddapi.service.UserService;

@RestController
@RequestMapping("api/auth")
public class AuthController {

	@Autowired
	private PasswordEncoder encoder;
	
	@Autowired
	private UserService userService;
	
	@GetMapping("/login")
	public ResponseEntity<?> loginUser(@Valid @RequestBody LoginRequest loginRequest){
		
		User user = userService.findByEmail(loginRequest.getEmail());
		
		//TODO : authentication with jwt
		
		if(user == null) {
			return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: invalid email"));
		}
		
		if(!encoder.matches(loginRequest.getPassword(), user.getPassword())) {
			return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: invalid password"));
		}
		return ResponseEntity
                .ok()
                .body(new MessageResponse("User "+user.getUserName()+" is logged in"));
	}
	
	@PostMapping("/register")
	public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest registerRequest){
		if (userService.existByEmail(registerRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already taken!"));
        }
		User user = new User(
				registerRequest.getEmail(),
                registerRequest.getUsername(),
                encoder.encode(registerRequest.getPassword()));
		
		userService.register(user);
		
		return ResponseEntity
                .ok()
                .body(new MessageResponse("User "+user.getUserName()+" is registered"));
	}
	
	
}
