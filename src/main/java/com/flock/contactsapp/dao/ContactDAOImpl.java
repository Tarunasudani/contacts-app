package com.flock.contactsapp.dao;

import com.flock.contactsapp.model.Contact;
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
    public Timestamp addContact(int userId, String name, String phoneNo, String email, String address, String company) {
        Timestamp contactId = Timestamp.from(Instant.now());
        int numOfRowsAffected = jdbcTemplate.update(
                "INSERT INTO Contacts(contactId, userId, name, phoneNo, email, address, company) VALUES(?,?,?,?,?,?,?);",
                new Object[] {contactId, userId, name, phoneNo, email, address, company}
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
                "SELECT * FROM Contacts WHERE userId=? ORDER BY name;",
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

    @Override
    public List<Contact> getContactsWithPrefix(int userId, String prefix) {
        return jdbcTemplate.query(
                "SELECT * FROM Contacts WHERE userId=? AND name LIKE ? ORDER BY name;",
                new BeanPropertyRowMapper<Contact>(Contact.class),
                new Object[] {userId,(new StringBuilder(prefix)).append("%")}
        );
    }
}
