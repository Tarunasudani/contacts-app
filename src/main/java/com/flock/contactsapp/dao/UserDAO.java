package com.flock.contactsapp.dao;

import com.flock.contactsapp.model.User;

import java.util.List;

public interface UserDAO {

    int addUser(String email, String password);

    List<User> verifyUser(String email, String password);
    List<User> getUserById(int userId);
}
