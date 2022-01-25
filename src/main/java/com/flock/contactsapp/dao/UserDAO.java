package com.flock.contactsapp.dao;

import com.flock.contactsapp.model.User;
import org.springframework.stereotype.Component;


@Component
public interface UserDAO {

    int addUser(String email, String password);

    User verifyAndGetUser(String email, String password);
    User getUserById(int userId);
}
