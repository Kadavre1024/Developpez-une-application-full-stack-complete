package com.openclassrooms.mddapi.dto;

import java.time.LocalDateTime;

import lombok.*;

/**
 * User Dto class
 * @author Guillaume Belaud
 * @version 0.1
 */
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
