package com.flock.contactsapp.dao;

import com.flock.contactsapp.model.Contact;
import com.flock.contactsapp.response.ContactResponse;

import java.sql.Timestamp;
import java.util.List;

public interface ContactDAO {

    ContactResponse addContact(int userId, String contactName, String phoneNumber, Object contactDetails);

    List<ContactResponse> getAllContactsByUserId(int userId);

    int updateScore(int userId, Timestamp contactId);

    int deleteContact(int userId, Timestamp contactId);

    ContactResponse updateContact(int userId, Contact contact);
}
