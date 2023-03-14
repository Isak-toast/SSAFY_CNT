package com.ssafy.ssafycntuserservice.controller;

import com.ssafy.ssafycntuserservice.dto.UserDto;
import com.ssafy.ssafycntuserservice.service.UserService;
import com.ssafy.ssafycntuserservice.vo.Greeting;
import com.ssafy.ssafycntuserservice.vo.RequestUser;
import com.ssafy.ssafycntuserservice.vo.ResponseUser;
import org.apache.tomcat.util.http.ResponseUtil;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

//    @PostMapping("/users")
//    public String createUser(@RequestBody RequestUser user){
//        ModelMapper mapper = new ModelMapper();
//        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
//
//        UserDto userDto = mapper.map(user, UserDto.class);
//        userService.createUser(userDto);
//        return "Create user method is called";
//    }
    /*
    ResponseEntity 객체에 ResponseUser 개체를 보내줌으로 Modelmappp을 통해서
    UserDto에서 ResponseUser 개체의 mapping되는 컬럼만을 받는다.
     */
    @PostMapping("/users")
    public ResponseEntity<ResponseUser> createUser(@RequestBody RequestUser user){
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        UserDto userDto = mapper.map(user, UserDto.class);
        userService.createUser(userDto);

        ResponseUser responseUser = mapper.map(userDto, ResponseUser.class);

        return ResponseEntity.status(HttpStatus.CREATED).body(responseUser);
    }
}
