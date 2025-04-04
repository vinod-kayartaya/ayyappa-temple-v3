package com.cyblore.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class DonationCategoryResponseDto {
    private String id;
    private String name;
    private String description;
    private String createdBy;
    private LocalDateTime createdAt;
    private String lastUpdatedBy;
    private LocalDateTime lastUpdatedAt;
} 