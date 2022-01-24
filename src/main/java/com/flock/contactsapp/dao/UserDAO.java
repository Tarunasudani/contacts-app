package com.flock.contactsapp.dao;

import com.flock.contactsapp.model.User;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface UserDAO {

    int addUser(String email, String password);

    List<User> verifyUser(String email, String password);
    User getUserById(int userId);
}
