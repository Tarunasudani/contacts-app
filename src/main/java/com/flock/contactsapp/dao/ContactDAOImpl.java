package com.flock.contactsapp.dao;

import com.flock.contactsapp.model.Contact;
import com.flock.contactsapp.response.ContactResponse;
import com.flock.contactsapp.rowMapper.ContactResponseRowMapper;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
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
    public ContactResponse addContact(int userId, String contactName, String phoneNumber, Object contactDetails) {
        Timestamp contactId = Timestamp.from(Instant.now());
        int numOfRowsAffected = jdbcTemplate.update(
                "INSERT INTO Contacts(contactId, userId, contactName, phoneNumber, contactDetails) VALUES(?,?,?,?,?);",
                contactId,
                userId,
                contactName,
                phoneNumber,
                new Gson().toJson(contactDetails)
        );

        if(numOfRowsAffected==1) {
            return new ContactResponse(
                    contactId,
                    contactName,
                    phoneNumber,
                    contactDetails,
                    0
            );
        }

        return null;
    }

    @Override
    public int updateScore(int userId, Timestamp contactId) {
        return jdbcTemplate.update(
                "UPDATE Contacts SET score = score + 1 WHERE userId=? AND contactId=?;",
                userId,
                contactId
        );
    }

    @Override
    public List<ContactResponse> getAllContactsByUserId(int userId) {
        return jdbcTemplate.query(
                "SELECT * FROM Contacts WHERE userId=? ORDER BY contactName;",
                new ContactResponseRowMapper(),
                userId
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
    public ContactResponse updateContact(int userId, Contact contact) {
         int numberOfRowsAffected = jdbcTemplate.update(
                "UPDATE contacts " +
                        "SET contactName=? , phoneNumber=? , contactDetails=?" +
                        "WHERE userId=? AND contactId=?;",
                 contact.getContactName(),
                 contact.getPhoneNumber(),
                 new Gson().toJson(contact.getContactDetails()),
                 userId,
                 contact.getContactId()
         );
         return new ContactResponse(contact);
    }

}
