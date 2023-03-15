package com.ssafy.ssafycntuserservice.service;

import com.ssafy.ssafycntuserservice.dto.UserDto;
import com.ssafy.ssafycntuserservice.jpa.UserEntity;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {
    UserDto createUser(UserDto userDto);

    UserDto getUserByUserId(String userId);
    Iterable<UserEntity> getUserByAll();
}
