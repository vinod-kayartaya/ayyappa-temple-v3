package com.cyblore.exceptions;

public class UnknownUsernameException extends RuntimeException {
    public UnknownUsernameException() {
    }

    public UnknownUsernameException(String message) {
        super(message);
    }

    public UnknownUsernameException(Throwable cause) {
        super(cause);
    }
}
