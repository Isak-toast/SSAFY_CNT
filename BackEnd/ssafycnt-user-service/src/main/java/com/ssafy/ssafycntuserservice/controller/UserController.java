package com.ssafy.ssafycntuserservice.controller;

import com.ssafy.ssafycntuserservice.dto.UserDto;
import com.ssafy.ssafycntuserservice.service.UserService;
import com.ssafy.ssafycntuserservice.vo.Greeting;
import com.ssafy.ssafycntuserservice.vo.RequestUser;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/")
public class UserController {
    private Environment env;
    private UserService userService;

    public UserController(Environment env, UserService userService) {
        this.env = env;
        this.userService = userService;
    }

    @Autowired
    private Greeting greeting;

    @GetMapping("/health_check")
    public String status() {
        return "It's working in user service";
    }

    @GetMapping("/welcome")
    public String wwelcome() {
//        return env.getProperty("greeting.message");
        return greeting.getMessage();
    }

    @PostMapping("/users")
    public String createUser(@RequestBody RequestUser user){
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        UserDto userDto = mapper.map(user, UserDto.class);
        userService.createUser(userDto);
        return "Create user method is called";
    }
}
