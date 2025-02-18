package com.cyblore.dto;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class UserResponseDto {
    private Integer id;
    private String username;
    private String firstname;
    private String lastname;
    private String primaryEmail;
    private String primaryPhone;
    private String secondaryEmail;
    private String secondaryPhone;
    private String designation;
    private Boolean isActive;
    private Boolean passwordChangeRequired;
    private LocalDateTime passwordLastChanged;
    private List<RoleDto> roles;
    private String createdBy;
    private LocalDateTime createdAt;

    @Data
    public static class RoleDto {
        private Integer id;
        private String role;
    }
} 