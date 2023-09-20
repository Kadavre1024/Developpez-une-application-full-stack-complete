package com.openclassrooms.mddapi.mapper;

import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

import com.openclassrooms.mddapi.dto.UserDto;
import com.openclassrooms.mddapi.model.User;

/**
 * User Mapper interface
 * @author Guillaume Belaud
 * @version 0.1
 */
@Component
@Mapper(componentModel="spring")
public interface UserMapper extends EntityMapper<UserDto, User> {

}
