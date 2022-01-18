package com.flock.contactsapp.controller;

import com.flock.contactsapp.dao.ContactDAO;
import com.flock.contactsapp.model.Contact;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.List;

@RestController
public class ContactController {

    @Autowired
    private ContactDAO contactDAO;

    @PostMapping("/contact/new")
    public Timestamp addContact(@RequestBody Contact contact) {
        System.out.println(contact);
        Timestamp contactId = contactDAO.addContact(
                contact.getUserId(),
                contact.getContactName(),
                contact.getPhoneNumber(),
                contact.getContactDetails()
        );
        return contactId;
    }

    @GetMapping("/contact/{userId}")
    public List<Contact> getAllContactsByUserId(@PathVariable int userId) {
        return contactDAO.getAllContactsByUserId(userId);
    }


    @PutMapping("/contact/updateScore")
    public int updateScore(@RequestBody Contact contact) {
        return contactDAO.updateScore(contact.getUserId(), contact.getContactId());
    }


    @DeleteMapping("/contact/delete")
    public int deleteContact(@RequestBody Contact contact) {
        return contactDAO.deleteContact(contact.getUserId(), contact.getContactId());
    }

}
