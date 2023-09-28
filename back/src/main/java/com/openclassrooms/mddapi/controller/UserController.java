package com.openclassrooms.mddapi.controller;

import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
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
import com.openclassrooms.mddapi.payload.MessageResponse;
import com.openclassrooms.mddapi.payload.UserUpdateRequest;
import com.openclassrooms.mddapi.service.UserService;

/**
 * User Controller
 * @author Guillaume Belaud
 * @version 0.1
 */
@RestController
@RequestMapping("api/user")
public class UserController {
	
	/**
	 * @see com.openclassrooms.mddapi.mapper.UserMapper.java
	 */
	@Autowired
	private UserMapper mapper;
	
	/**
	 * @see com.openclassrooms.mddapi.service.UserService.java
	 */
	@Autowired
	private UserService service;	
	
	/**
	 * @see com.openclassrooms.mddapi.security.WebSecurityConfig.java
	 */
	@Autowired
	private PasswordEncoder encoder;
	
	/**
	 * Get a user details by id
	 * @param id		string corresponding to a user
	 * @return			httpResponse status 200 with user Dto object
	 * 					else return status 400 for a NumberFormatException
	 * 					or status 404 if id is unknown
	 */
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
	
	/**
	 * Update a user details by id
	 * @param id		string corresponding to a user
	 * @return			httpResponse status 200 with successful message response
	 * 					else return status 400 for a NumberFormatException
	 * 					or status 404 if id is unknown
	 * 					or status 401 if authenticate user is different to updating user
	 */
	@PutMapping("/{id}")
    public ResponseEntity<?> updateById(@PathVariable("id") String id, @RequestBody UserUpdateRequest updatedUser) {
        try {
            User user = service.findById(Long.valueOf(id));

            if (user == null) {
                return ResponseEntity.notFound().build();
            }
            
            UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

            if(!Objects.equals(userDetails.getUsername(), user.getEmail())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
            
            user.setUserName(updatedUser.getUserName());
            user.setEmail(updatedUser.getEmail());
            user.setPassword(encoder.encode(updatedUser.getPassword()));
            service.register(user);
            
    		return ResponseEntity.ok().body(new MessageResponse("Successful update !"));
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().build();
        }
    }
	
	
	/**
	 * Delete a user by id
	 * @param id		string corresponding to a user
	 * @return			httpResponse status 200
	 * 					else return status 400 for a NumberFormatException
	 * 					or status 404 if id is unknown
	 * 					or status 401 if authenticate user is different to deleting user
	 */
    @DeleteMapping("{id}")
    public ResponseEntity<?> delete(@PathVariable("id") String id) {
        try {
            User user = service.findById(Long.valueOf(id));

            if (user == null) {
                return ResponseEntity.notFound().build();
            }

            UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

            if(!Objects.equals(userDetails.getUsername(), user.getEmail())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }

            service.delete(Long.parseLong(id));
            return ResponseEntity.ok().build();
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().build();
        }
    }

}
