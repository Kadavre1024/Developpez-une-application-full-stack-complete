package com.openclassrooms.mddapi.dto;

import java.time.LocalDateTime;

import com.openclassrooms.mddapi.model.Post;

import lombok.*;

/**
 * Comment Dto class
 * @author Guillaume Belaud
 * @version 0.1
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentDto {

	private Long id;
	
	@NonNull
	private String text;
	
	@NonNull
	private Long user_id;
	
	@NonNull
	private Long post_id;
	
	private LocalDateTime createdAt;
}
