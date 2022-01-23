package com.flock.contactsapp.exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
 @NoArgsConstructor
public class ErrorResponse {
    private Date timestamp;
    private String message;
    private String details;

    public ErrorResponse(Date timestamp, String message, String details) {
        super();
        this.timestamp = timestamp;
        this.message = message;
        this.details = details;
    }
}
