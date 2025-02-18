package com.cyblore.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class OfferingCategoryResponseDto {
    private String id;
    private String name;
    private String createdBy;
    private LocalDateTime createdAt;
    private String lastUpdatedBy;
    private LocalDateTime lastUpdatedAt;
} 