package com.cyblore.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class ProductResponseDto {
    private String id;
    private Integer code;
    private String name;
    private String unit;
    private String supplierId;
    private String supplierName;
    private String categoryId;
    private String categoryName;
    private BigDecimal price;
    private BigDecimal costPrice;
    private BigDecimal commissionPercentage;
    private BigDecimal taxPercentage;
    private BigDecimal astPercentage;
    private Integer openingStock;
    private Integer issued;
    private Integer received;
    private Integer damaged;
    private Integer salesReturned;
    private Integer purchasesReturned;
    private Integer blocked;
    private Integer quantityInStock;
    private String createdBy;
    private LocalDateTime createdAt;
    private String lastUpdatedBy;
    private LocalDateTime lastUpdatedAt;
} 