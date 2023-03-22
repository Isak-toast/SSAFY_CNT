package com.ssafy.ssafycntuserservice.dto;

import com.ssafy.ssafycntuserservice.vo.ResponseOrder;
import lombok.Data;

import javax.xml.ws.Response;
import java.util.Date;
import java.util.List;

@Data
public class UserDto {
    private String email;
    private String name;
    private String pwd;
    private String userId;
    private Date createdAt;
    private String encryptedPwd;

    private List<ResponseOrder> orders;
}