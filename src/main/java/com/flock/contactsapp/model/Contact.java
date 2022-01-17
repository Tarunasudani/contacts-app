package com.flock.contactsapp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Contact {
    private Timestamp contactId;
    private int userId;
    private String contactName;
    private String phoneNumber;
    private Object contactDetails;
    private int score;
    private Timestamp createdAt;
    private Timestamp modifiedAt;

    @Override
    public String toString() {
        return "Contact{" +
                "contactId=" + contactId +
                ", userId=" + userId +
                ", contactName='" + contactName + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", contactDetails='" + contactDetails + '\'' +
                ", score=" + score +
                '}';
    }
}
