package com.cyblore.dto;

import lombok.Data;

@Data
public class SuccessResponse {
    private String message;

    public SuccessResponse(String message) {
        this.message = message;
    }
} 