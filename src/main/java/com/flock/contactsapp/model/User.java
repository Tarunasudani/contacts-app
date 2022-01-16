package com.flock.contactsapp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/*
* @Data for creating setters & getters
* @AllArgsConstructor for creating a constructor with all arguments
* @NoArgsConstructor for creating a constructor with no arguments
* From Lombok
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    private int userId;
    private String email;
    private String password;

    @Override
    public String toString() {
        return "User{" + userId + " " + email + " " + password + "};";
    }

}
