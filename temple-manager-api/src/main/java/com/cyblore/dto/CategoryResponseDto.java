package com.cyblore.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class CategoryResponseDto {
    private String id;
    private Integer code;
    private String name;
    private String description;
    private String createdBy;
    private LocalDateTime createdAt;
    private String lastUpdatedBy;
    private LocalDateTime lastUpdatedAt;
} 