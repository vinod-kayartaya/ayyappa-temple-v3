package com.cyblore.dto;

import lombok.Data;
import java.util.List;

@Data
public class UserRequestDto {
    private String username;
    private String firstname;
    private String lastname;
    private String primaryEmail;
    private String primaryPhone;
    private String secondaryEmail;
    private String secondaryPhone;
    private String password;
    private String designation;
    private List<Integer> roles;
    private Boolean isActive;
} 