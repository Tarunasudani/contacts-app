package com.flock.contactsapp.controller;

import com.flock.contactsapp.dao.UserDAO;
import com.flock.contactsapp.model.Response;
import com.flock.contactsapp.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
public class UserController {

    @Autowired
    private UserDAO userDAO;

    @PostMapping("/user/new")
    public Response addUser(@RequestBody User user) {
        try {
            return
                    new Response(
                            "success",
                            new HashMap<String, Object>() {{
                                put("userId",userDAO.addUser(user.getEmail(),user.getPassword()));
                            }}
                    );
        }
        catch(Exception e) {
            System.err.println(e);
            return
                    new Response(
                        "failure",
                        new HashMap<String, Object>() {{
                            put("error","User already exists");
                        }}
                    );
        }
    }

    @GetMapping("/user/validate")
    public Response verifyUser(@RequestBody User user) {
        try {
            return
                    new Response(
                            "success",
                            new HashMap<String, Object>() {{
                                put("user",userDAO.verifyUser(user.getEmail(), user.getPassword()));
                            }}
                    );
        }
        catch(Exception e) {
            System.err.println(e);
            return
                    new Response(
                    "failure",
                    new HashMap<String, Object>() {{
                        put("error","Invalid Credentials");
                    }}
            );
        }
    }



}
