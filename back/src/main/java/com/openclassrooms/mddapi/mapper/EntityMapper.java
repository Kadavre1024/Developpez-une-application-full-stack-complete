package com.openclassrooms.mddapi.mapper;

import java.util.List;

/**
 * Entity Mapper interface
 * @author Guillaume Belaud
 * @version 0.1
 */
public interface EntityMapper<Dto, Entity> {
	
	Entity toEntity(Dto dto);
	
	Dto toDto(Entity entity);
	
	List<Entity> toEntity(List<Dto> dto);
	
	List<Dto> toDto(List<Entity> entity);

}
