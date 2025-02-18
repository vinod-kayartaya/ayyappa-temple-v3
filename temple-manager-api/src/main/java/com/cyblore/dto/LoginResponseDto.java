package com.cyblore.dto;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class LoginResponseDto {
    private Integer id;
    private String username;
    private String firstname;
    private String lastname;
    private String designation;
    private String primaryEmail;
    private String primaryPhone;
    private String secondaryEmail;
    private String secondaryPhone;
    private LocalDateTime createdAt;
    private String createdBy;
    private Boolean isActive;
    private Boolean passwordChangeRequired;
    private LocalDateTime passwordLastChanged;
    private String token;
    private List<Integer> privileges;

    public LoginResponseDto() {}

    public LoginResponseDto(String token) {
        this.token = token;
    }
}
