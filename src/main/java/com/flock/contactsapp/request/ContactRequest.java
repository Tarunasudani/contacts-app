package com.flock.contactsapp.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ContactRequest {

    private String contactName;
    private String phoneNumber;
    private Object contactDetails;

    @Override
    public String toString() {
        return "ContactRequest{" +
                "contactName='" + contactName + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", contactDetails=" + contactDetails +
                '}';
    }
}
