package com.flock.contactsapp.dao;

import com.flock.contactsapp.model.Contact;

import java.sql.Timestamp;
import java.util.List;

public interface ContactDAO {

    Timestamp addContact(int userId, String name, String phoneNo, String email, String address, String company);

    List<Contact> getAllContactsByUserId(int userId);

    int updateScore(int userId, Timestamp contactId);

    int deleteContact(int userId, Timestamp contactId);

    List<Contact> getContactsWithPrefix(int userId, String prefix);

}
