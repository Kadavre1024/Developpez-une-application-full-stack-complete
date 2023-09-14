package com.openclassrooms.mddapi.payload;

import lombok.Data;
import lombok.NonNull;

@Data
public class UserUpdateRequest {

	@NonNull
	private String userName;
	
	@NonNull
	private String email;
}
