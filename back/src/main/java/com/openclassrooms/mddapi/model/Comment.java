package com.openclassrooms.mddapi.model;

import java.time.LocalDateTime;

import javax.persistence.*;

import org.springframework.data.annotation.CreatedDate;

import lombok.Builder;
import lombok.Data;
import lombok.NonNull;

@Entity
@Builder
@Data
@Table(name = "COMMENTS")
public class Comment {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "comment_id")
	private Long id;
	
	@NonNull
	private String title;
	
	@NonNull
	private String text;
	
	@NonNull
	@OneToOne
	@JoinColumn(name = "user_id", referencedColumnName = "id")
	private User user;
	
	@OneToOne
    @JoinColumn(name = "post_id", referencedColumnName = "id")
	private Post post;
	
	@CreatedDate
	@Column(name = "created_at", updatable = false)
	private LocalDateTime createdAt;	
}
