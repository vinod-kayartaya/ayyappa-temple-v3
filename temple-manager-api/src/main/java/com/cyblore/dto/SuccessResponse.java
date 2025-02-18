package com.cyblore.dto;

import lombok.Data;

@Data
public class SuccessResponse {
    private String message;
    private String code = "SUCCESS";

    public SuccessResponse(String message) {
        this.message = message;
    }
} 