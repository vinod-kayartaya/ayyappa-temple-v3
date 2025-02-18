package com.cyblore.dto;

import lombok.Data;

@Data
public class UpdatePasswordRequestDto {
    private String token;
    private String newPassword;
} 