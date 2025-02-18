package com.cyblore.exceptions;

public class UserAccountInactiveException extends RuntimeException{
    public UserAccountInactiveException() {
    }

    public UserAccountInactiveException(String message) {
        super(message);
    }

    public UserAccountInactiveException(Throwable cause) {
        super(cause);
    }
}
