package com.openclassrooms.mddapi.dto;

import java.time.LocalDateTime;

import lombok.*;

/**
 * Post Dto class
 * @author Guillaume Belaud
 * @version 0.1
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostDto {

	private Long id;
	
	@NonNull
	private String title;
	
	@NonNull
	private String text;
	
	private Long topic_id;
	
	private Long user_id;
	
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
