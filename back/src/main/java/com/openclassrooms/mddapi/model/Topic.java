package com.openclassrooms.mddapi.model;

import java.util.List;

import javax.persistence.*;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.ToString;
import lombok.experimental.Accessors;

@Entity
@Data
@Accessors(chain = true)
@EntityListeners(AuditingEntityListener.class)
@EqualsAndHashCode(of = {"id"})
@Builder
@NoArgsConstructor
@RequiredArgsConstructor
@AllArgsConstructor
@ToString
@Table(name = "TOPICS")
public class Topic {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	//@Column(name = "topic_id")
	private Long id;
	
	@NonNull
	@Column(nullable = false)
	private String name;
	
	@NonNull
	private String description;
	
	@ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "SUBSCRIBE",
            joinColumns = @JoinColumn( name = "topic_id" ),
            inverseJoinColumns = @JoinColumn( name = "user_id" ) )
	private List<User> users;
	
}
