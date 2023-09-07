package com.openclassrooms.mddapi.dto;

import java.time.LocalDateTime;

import com.openclassrooms.mddapi.model.Post;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentDto {

	private Long id;
	
	@NonNull
	private String title;
	
	@NonNull
	private String text;
	
	@NonNull
	private Long user_id;
	
	private Long post_id;
	
	private LocalDateTime createdAt;
}
