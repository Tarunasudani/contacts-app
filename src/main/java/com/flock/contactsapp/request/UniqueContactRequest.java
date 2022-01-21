package com.flock.contactsapp.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UniqueContactRequest {

    private Timestamp contactId;

    @Override
    public String toString() {
        return "UniqueContactRequest{" +
                "contactId=" + contactId +
                '}';
    }
}
