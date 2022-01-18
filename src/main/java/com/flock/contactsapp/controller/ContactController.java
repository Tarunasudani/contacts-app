package com.flock.contactsapp.controller;

import com.flock.contactsapp.dao.ContactDAO;
import com.flock.contactsapp.model.Contact;
import com.flock.contactsapp.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.List;

@RestController
public class ContactController {

    @Autowired
    private ContactDAO contactDAO;

    JwtUtil jwtUtil;

    @PostMapping("/contact/new")
    public ResponseEntity<Timestamp> addContact(@RequestBody Contact contact, @RequestHeader("session-token") String sessionToken) {
        if ( jwtUtil.verifyToken(sessionToken) == false ) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }
        System.out.println(contact);
        Timestamp contactId = contactDAO.addContact(
                contact.getUserId(),
                contact.getContactName(),
                contact.getPhoneNumber(),
                contact.getContactDetails()
        );
        return new ResponseEntity<>(contactId, HttpStatus.OK);
    }

    @GetMapping("/contact/{userId}")
    public ResponseEntity<List<Contact>> getAllContactsByUserId(@PathVariable int userId, @RequestHeader("session-token") String sessionToken) {
        if ( jwtUtil.verifyToken(sessionToken) == false ) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(contactDAO.getAllContactsByUserId(userId), HttpStatus.OK);
    }


    @PutMapping("/contact/updateScore")
    public ResponseEntity<Integer> updateScore(@RequestBody Contact contact, @RequestHeader("session-token") String sessionToken) {
        if ( jwtUtil.verifyToken(sessionToken) == false ) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(contactDAO.updateScore(contact.getUserId(), contact.getContactId()), HttpStatus.OK);
    }


    @DeleteMapping("/contact/delete")
    public ResponseEntity<Integer> deleteContact(@RequestBody Contact contact, @RequestHeader("session-token") String sessionToken) {
        if ( jwtUtil.verifyToken(sessionToken) == false ) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(contactDAO.deleteContact(contact.getUserId(), contact.getContactId()), HttpStatus.OK);
    }

}
