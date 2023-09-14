package com.openclassrooms.mddapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.mapper.UserMapper;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.payload.JwtResponse;
import com.openclassrooms.mddapi.payload.MessageResponse;
import com.openclassrooms.mddapi.payload.UserUpdateRequest;
import com.openclassrooms.mddapi.security.JwtUtil;
import com.openclassrooms.mddapi.security.UserDetailsImpl;
import com.openclassrooms.mddapi.security.UserDetailsServiceImpl;
import com.openclassrooms.mddapi.service.UserService;

@RestController
@RequestMapping("api/user")
public class UserController {
	
	@Autowired
	private UserMapper mapper;
	
	@Autowired
	private UserService service;
	
	@Autowired
	private AuthenticationManager authManager;
	
	@Autowired
	private JwtUtil jwtUtil;
	
	@Autowired
	private PasswordEncoder encoder;
	
	@Autowired
	private UserDetailsServiceImpl userDetailsService;
	
	@GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable("id") String id) {
        try {
            User user = service.findById(Long.valueOf(id));

            if (user == null) {
                return ResponseEntity.notFound().build();
            }

            return ResponseEntity.ok().body(mapper.toDto(user));
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().build();
        }
    }
	
	@PutMapping("/{id}")
    public ResponseEntity<?> updateById(@PathVariable("id") String id, @RequestBody UserUpdateRequest updatedUser) {
        try {
            User user = service.findById(Long.valueOf(id));

            if (user == null) {
                return ResponseEntity.notFound().build();
            }
            
            user.setUserName(updatedUser.getUserName());
            user.setEmail(updatedUser.getEmail());
            service.register(user);
            
    		return ResponseEntity.ok().body(new MessageResponse("Successful update !"));
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> delete(@PathVariable("id") String id) {
        try {
            User user = service.findById(Long.valueOf(id));

            if (user == null) {
                return ResponseEntity.notFound().build();
            }

            //TODO : Add authentication verification before deleting

            service.delete(Long.parseLong(id));
            return ResponseEntity.ok().build();
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().build();
        }
    }

}
