package com.flock.contactsapp.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.util.Date;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(AuthorizationException.class)
    public ResponseEntity<?> authExceptionHandler(AuthorizationException e, WebRequest req) {
        ErrorResponse errorResponse = new ErrorResponse(new Date(), e.getMessage(), req.getDescription(false));
        return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(InvalidUser.class)
    public ResponseEntity<?> invalidUserHandler(InvalidUser e, WebRequest req) {
        ErrorResponse errorResponse = new ErrorResponse(new Date(), e.getMessage(), req.getDescription(false));
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> globalExceptionHandling(Exception exception, WebRequest req) {
        ErrorResponse errorResponse = new ErrorResponse(new Date(), exception.getMessage(), req.getDescription(false));
        return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
