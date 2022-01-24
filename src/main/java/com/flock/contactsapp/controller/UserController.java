package com.flock.contactsapp.controller;
import com.flock.contactsapp.dao.UserDAO;
import com.flock.contactsapp.model.User;
import com.flock.contactsapp.request.UserRequest;
import com.flock.contactsapp.response.AuthResponse;
import com.flock.contactsapp.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
public class UserController {
    @Autowired
    UserDAO userDAO;

    JwtUtil jwtUtil;

    @PostMapping("/user/login")
    public AuthResponse userLogin(@RequestBody UserRequest userRequest) {

        List<User> fetchedUser = userDAO.verifyUser(userRequest.getEmail(), userRequest.getPassword());

        return new AuthResponse(
                jwtUtil.createToken(
                        fetchedUser.get(0).getUserId(),
                        userRequest.getEmail(),
                        9000000
                )
        );

    }

    @PostMapping("/user/new")
    public AuthResponse userSignup(@RequestBody UserRequest userRequest) {

        int userId = userDAO.addUser(userRequest.getEmail(), userRequest.getPassword());
        return new AuthResponse(
                jwtUtil.createToken(
                        userId,
                        userRequest.getEmail(),
                        9000000
                )
        );
    }

}
