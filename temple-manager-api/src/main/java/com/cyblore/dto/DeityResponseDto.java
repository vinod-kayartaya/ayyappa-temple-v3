package com.cyblore.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class DeityResponseDto {
    private String id;
    private String name;
    private String createdBy;
    private LocalDateTime createdAt;
} 