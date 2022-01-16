package com.flock.contactsapp.controller;

import com.flock.contactsapp.dao.ContactDAO;
import com.flock.contactsapp.model.Contact;
import com.flock.contactsapp.model.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.HashMap;

@RestController
public class ContactController {

    @Autowired
    private ContactDAO contactDAO;

    @PostMapping("/contact/new")
    public Response addContact(@RequestBody Contact contact) {
        Timestamp contactId = contactDAO.addContact(
                contact.getUserId(),
                contact.getName(),
                contact.getPhoneNo(),
                contact.getEmail(),
                contact.getAddress(),
                contact.getCompany()
        );
        if(contactId != null ) {
            return
                    new Response(
                            "success",
                            new HashMap<String, Object>() {{
                                put("contactId",contactId.toString());
                            }}
                    );
        } else {
            return
                    new Response(
                        "failure",
                        new HashMap<String, Object>() {{
                            put("error", "Something went wrong!!!!");
                        }}
                    );
        }
    }

    @GetMapping("/contact/userId")
    public Response getAllContactsByUserId(@RequestBody int userId) {
        try {
            return
                    new Response(
                            "success",
                            new HashMap<String, Object>() {{
                                put("contacts",contactDAO.getAllContactsByUserId(userId));
                            }}
                    );
        } catch (Exception e) {
            System.err.println(e);
            return
                    new Response(
                        "failure",
                        new HashMap<String, Object>() {{
                            put("error","Something went wrong!!!");
                        }}
                );
        }
    }

    @PutMapping("/contact/updateScore")
    public Response updateScore(@RequestBody Contact contact) {
        try {
            if(contactDAO.updateScore(contact.getUserId(), contact.getContactId()) == 1) {
                return
                        new Response(
                                "success",
                                new HashMap<String, Object>() {{
                                    put("message", "Score updated!!!");
                                }}
                        );
            } else {
                System.err.println("Contact not found!!!");
                return
                        new Response(
                                "failure",
                                new HashMap<String, Object>() {{
                                    put("error", "Contact not found!!!");
                                }}
                        );
            }
        } catch (Exception e) {
            System.err.println(e);
            return
                    new Response(
                            "failure",
                            new HashMap<String, Object>() {{
                                put("error", "Something went wrong!!!");
                            }}
                    );
        }
    }

    @DeleteMapping("/contact/delete")
    public Response deleteContact(@RequestBody Contact contact) {
        try {
            if(contactDAO.deleteContact(contact.getUserId(), contact.getContactId()) == 1) {
                return
                        new Response(
                                "success",
                                new HashMap<String, Object>() {{
                                    put("message", "Contact successfully deleted");
                                }}
                        );
            } else {
                System.err.println("Contact not found!!!");
                return
                        new Response(
                                "failure",
                                new HashMap<String, Object>() {{
                                    put("error", "Contact not found!!!");
                                }}
                        );
            }
        } catch (Exception e) {
            System.err.println(e);
            return
                    new Response(
                            "failure",
                            new HashMap<String, Object>() {{
                                put("error", "Something went wrong!!!");
                            }}
                    );
        }
    }


    @GetMapping("/contact/prefix")
    public Response getContactsWithPrefix(@RequestBody Contact contact) {
        try {
            return
                    new Response(
                            "success",
                            new HashMap<String, Object>() {{
                                put("contacts",contactDAO.getContactsWithPrefix(contact.getUserId(), contact.getName()));
                            }}
                    );
        } catch (Exception e) {
            System.err.println(e);
            return
                    new Response(
                            "failure",
                            new HashMap<String, Object>() {{
                                put("error","Something went wrong!!!");
                            }}
                    );
        }
    }



}
