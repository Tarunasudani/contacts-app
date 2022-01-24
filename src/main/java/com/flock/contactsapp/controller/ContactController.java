package com.flock.contactsapp.controller;
import com.flock.contactsapp.dao.ContactDAO;
import com.flock.contactsapp.request.ContactRequest;
import com.flock.contactsapp.request.UniqueContactRequest;
import com.flock.contactsapp.response.ContactResponse;
import com.flock.contactsapp.util.JwtUtil;
import com.flock.contactsapp.model.Contact;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.List;

@CrossOrigin
@RestController
public class ContactController {

    @Autowired
    ContactDAO contactDAO;

    @Autowired
    JwtUtil jwtUtil;

    @PostMapping("/contact/new")
    public ResponseEntity<ContactResponse> addContact(@RequestBody ContactRequest contactRequest, @RequestHeader("Authorization") String sessionToken) {
        Integer userId = jwtUtil.verifyTokenAndGetUserId(sessionToken);

        System.out.println(contactRequest);
        ContactResponse newContact = contactDAO.addContact(
                userId,
                contactRequest.getContactName(),
                contactRequest.getPhoneNumber(),
                contactRequest.getContactDetails()
        );
        return new ResponseEntity<ContactResponse>(newContact, HttpStatus.OK);
    }

    @GetMapping("/contact/all")
    public ResponseEntity<List<ContactResponse>> getAllContactsByUserId(@RequestHeader("Authorization") String sessionToken) {
        Integer userId = jwtUtil.verifyTokenAndGetUserId(sessionToken);
        return new ResponseEntity<>(contactDAO.getAllContactsByUserId(userId), HttpStatus.OK);
    }


    @PutMapping("/contact/updateScore")
    public ResponseEntity<Integer> updateScore(@RequestBody UniqueContactRequest uniqueContactRequest, @RequestHeader("Authorization") String sessionToken) {
        Integer userId = jwtUtil.verifyTokenAndGetUserId(sessionToken);

        System.out.println("updateScore : " + uniqueContactRequest);
        return new ResponseEntity<Integer>(contactDAO.updateScore(userId, uniqueContactRequest.getContactId()), HttpStatus.OK);
    }


    @DeleteMapping("/contact/delete")
    public ResponseEntity<Integer> deleteContact(@RequestBody UniqueContactRequest uniqueContactRequest, @RequestHeader("Authorization") String sessionToken) {
        System.out.println("delete: " + uniqueContactRequest);
        Integer userId = jwtUtil.verifyTokenAndGetUserId(sessionToken);

        return new ResponseEntity<>(contactDAO.deleteContact(userId, uniqueContactRequest.getContactId()), HttpStatus.OK);
    }

    @PostMapping("/contact/update")
    public ResponseEntity<ContactResponse> updateContact(@RequestBody Contact contact, @RequestHeader("Authorization") String sessionToken) {
        Integer userId = jwtUtil.verifyTokenAndGetUserId(sessionToken);

        System.out.println("updateContact " + contact);
        return new ResponseEntity<ContactResponse>(contactDAO.updateContact(userId, contact), HttpStatus.OK);
    }

}
