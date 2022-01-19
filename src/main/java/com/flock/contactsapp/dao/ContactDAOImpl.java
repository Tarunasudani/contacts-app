package com.flock.contactsapp.dao;

import com.flock.contactsapp.model.Contact;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;

@Repository
public class ContactDAOImpl implements ContactDAO{

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public Timestamp addContact(int userId, String contactName, String phoneNumber, Object contactDetails) {
        Timestamp contactId = Timestamp.from(Instant.now());
        int numOfRowsAffected = jdbcTemplate.update(
                "INSERT INTO Contacts(contactId, userId, contactName, phoneNumber, contactDetails) VALUES(?,?,?,?,?);",
                new Object[] {contactId, userId, contactName, phoneNumber, new Gson().toJson(contactDetails)}
        );
        if(numOfRowsAffected==1)
            return contactId;
        return null;
    }

    @Override
    public int updateScore(int userId, Timestamp contactId) {
        return jdbcTemplate.update(
                "UPDATE Contacts SET score = score + 1 WHERE userId=? AND contactId=?;",
                new Object[]{userId, contactId}
        );

    }

    @Override
    public List<Contact> getAllContactsByUserId(int userId) {
        return jdbcTemplate.query(
                "SELECT * FROM Contacts WHERE userId=? ORDER BY contactName;",
                new BeanPropertyRowMapper<Contact>(Contact.class),
                new Object[] {userId}
        );
    }


    @Override
    public int deleteContact(int userId, Timestamp contactId) {
        return jdbcTemplate.update(
                "DELETE FROM Contacts WHERE userId=? AND contactId=?;",
                new Object[]{userId, contactId}
        );
    }

}
