package com.cyblore.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class RoleResponseDto {
    private Integer id;
    private String role;
    private String createdBy;
    private LocalDateTime createdAt;
} 