package com.openclassrooms.mddapi.payload;

import lombok.Data;

/**
 * RegisterRequest payload class
 * @author Guillaume Belaud
 * @version 0.1
 */
@Data
public class RegisterRequest {

	private String username;
	
	private String email;
	
	private String password;
}
