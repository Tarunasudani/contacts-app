package com.flock.contactsapp.response;

import com.flock.contactsapp.model.Contact;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ContactResponse {

    private Timestamp contactId;
    private String contactName;
    private String phoneNumber;
    private Object contactDetails;
    private int score;

    public ContactResponse(Contact contact) {
        this.contactId = contact.getContactId();
        this.contactName = contact.getContactName();
        this.phoneNumber = contact.getPhoneNumber();
        this.contactDetails = contact.getContactDetails();
        this.score = contact.getScore();
    }

    @Override
    public String toString() {
        return "ContactResponse{" +
                "contactId=" + contactId +
                ", contactName='" + contactName + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", contactDetails=" + contactDetails +
                ", score=" + score +
                '}';
    }
}
