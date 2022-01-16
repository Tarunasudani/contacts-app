package com.flock.contactsapp.dao;

import com.flock.contactsapp.model.User;

public interface UserDAO {

    int addUser(String email, String password);

    User verifyUser(String email, String password);
}
