package com.openclassrooms.mddapi.payload;

import lombok.Data;

/**
 * LoginRequest payload class
 * @author Guillaume Belaud
 * @version 0.1
 */
@Data
public class LoginRequest {

	private String email;
	
	private String password;
}
