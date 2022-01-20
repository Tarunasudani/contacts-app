package com.flock.contactsapp.controller;
import com.flock.contactsapp.dao.UserDAO;
import com.flock.contactsapp.model.User;
import com.flock.contactsapp.util.JwtUtil;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
class Response {
    private User user;
    private String sessionToken;
}

@CrossOrigin
@RestController
public class UserController {
    @Autowired
    UserDAO userDAO;

    JwtUtil jwtUtil;

    @PostMapping("/user/login")
    public Response userLogin(@RequestBody User user) {
        System.out.println(user);
        List<User> fetchedUser = userDAO.verifyUser(user.getEmail(), user.getPassword());
        if ( fetchedUser.size() == 0 )
            return null;
        Response responseObject = new Response();
        responseObject.setSessionToken(jwtUtil.createToken(fetchedUser.get(0).getUserId(), user.getEmail(), 9000000));
        responseObject.setUser(fetchedUser.get(0));
        return responseObject;
    }

    @PostMapping("/user/new")
    public Response userSignup(@RequestBody User user) {
        System.out.println(user);
        Response responseObject = new Response();
        int userId = userDAO.addUser(user.getEmail(), user.getPassword());
        responseObject.setSessionToken(jwtUtil.createToken(userId, user.getEmail(), 9000000));
        responseObject.setUser(userDAO.verifyUser(user.getEmail(), user.getPassword()).get(0));
        return responseObject;
    }

}
