package com.cyblore.exceptions;

public class PasswordChangeRequiredException extends RuntimeException{
    public PasswordChangeRequiredException() {
    }

    public PasswordChangeRequiredException(String message) {
        super(message);
    }

    public PasswordChangeRequiredException(Throwable cause) {
        super(cause);
    }
}
