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
    private String name;
    private String phoneNo;
    private String email;
    private String address;
    private String company;
    private int score;

    @Override
    public String toString() {
        return "Contact{" +
                "contactId=" + contactId +
                ", userId=" + userId +
                ", name='" + name + '\'' +
                ", phoneNo='" + phoneNo + '\'' +
                ", email='" + email + '\'' +
                ", address='" + address + '\'' +
                ", company='" + company + '\'' +
                ", score=" + score +
                '}';
    }
}
