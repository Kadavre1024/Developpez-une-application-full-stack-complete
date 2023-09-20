package com.openclassrooms.mddapi.dto;

import java.util.List;

import lombok.*;

/**
 * Topic Dto class
 * @author Guillaume Belaud
 * @version 0.1
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TopicDto {

	private Long id;
	
	@NonNull
	private String name;
	
	@NonNull
	private String description;
	
	private List<Long> users;
}
