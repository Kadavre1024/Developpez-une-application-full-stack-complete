package com.openclassrooms.mddapi.dto;

import java.time.LocalDateTime;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {

	  private Long id;

	  @NonNull
	  private String email;

	  @NonNull
	  private String userName;

	  @NonNull
	  private String password;

	  private LocalDateTime createdAt;

	  private LocalDateTime updatedAt;
}
