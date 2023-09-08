package com.openclassrooms.mddapi.dto;

import java.util.List;

import lombok.*;

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
