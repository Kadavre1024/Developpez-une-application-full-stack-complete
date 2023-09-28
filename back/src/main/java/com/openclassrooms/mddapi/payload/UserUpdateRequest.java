package com.openclassrooms.mddapi.payload;

import lombok.Data;
import lombok.NonNull;

/**
 * UserUpdateRequest payload class
 * @author Guillaume Belaud
 * @version 0.1
 */
@Data
public class UserUpdateRequest {

	@NonNull
	private String userName;
	
	@NonNull
	private String email;
	
	@NonNull
	private String password;
}
