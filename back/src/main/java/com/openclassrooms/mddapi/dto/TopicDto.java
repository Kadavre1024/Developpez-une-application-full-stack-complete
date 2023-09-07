package com.openclassrooms.mddapi.dto;

import java.util.List;

import com.openclassrooms.mddapi.model.User;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TopicDto {

	private Long id;
	
	@NonNull
	private String name;
	
	private List<Long> users;
}
