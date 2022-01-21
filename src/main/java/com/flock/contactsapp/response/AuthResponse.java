package com.flock.contactsapp.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
    private String sessionToken;

    @Override
    public String toString() {
        return "AuthResponse{" +
                "sessionToken='" + sessionToken + '\'' +
                '}';
    }
}
