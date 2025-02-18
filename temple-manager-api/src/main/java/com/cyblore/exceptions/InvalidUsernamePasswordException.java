package com.cyblore.exceptions;

public class InvalidUsernamePasswordException extends ApplicationException{
    public InvalidUsernamePasswordException() {
    }

    public InvalidUsernamePasswordException(String message) {
        super(message);
    }

    public InvalidUsernamePasswordException(Throwable cause) {
        super(cause);
    }
}
