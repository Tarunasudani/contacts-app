package com.flock.contactsapp.dao;

import com.flock.contactsapp.model.Contact;

import java.sql.Time;
import java.sql.Timestamp;
import java.util.List;

public interface ContactDAO {

    Timestamp addContact(int userId, String contactName, String phoneNumber, Object contactDetails);

    List<Contact> getAllContactsByUserId(int userId);

    int updateScore(int userId, Timestamp contactId);

    int deleteContact(int userId, Timestamp contactId);

    Contact updateContact(int userId, Contact contact);
}
