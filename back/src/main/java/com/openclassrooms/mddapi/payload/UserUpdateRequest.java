package com.openclassrooms.mddapi.payload;

import lombok.Data;

@Data
public class UserUpdateRequest {

	private String userName;
	
	private String email;
}
