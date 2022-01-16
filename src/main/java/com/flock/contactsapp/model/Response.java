package com.flock.contactsapp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashMap;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Response {

    private String status;
    private HashMap<String, Object> data;

    @Override
    public String toString() {
        return "Response{" +
                "status='" + status + '\'' +
                ", data=" + data +
                '}';
    }
}
