package com.cyblore.dto;

import lombok.Data;
import java.time.LocalDateTime;
import java.math.BigDecimal;

@Data
public class SupplierResponseDto {
    private String id;
    private Integer code;
    private String name;
    private String shortForm;
    private String type;
    private String address;
    private String phone;
    private String email;
    private Integer reorderLevel;
    private BigDecimal marginPercentage;
    private String createdBy;
    private LocalDateTime createdAt;
    private String lastUpdatedBy;
    private LocalDateTime lastUpdatedAt;
} 