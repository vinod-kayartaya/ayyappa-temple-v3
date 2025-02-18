package com.cyblore.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class ProductRequestDto {
    private Integer code;
    private String name;
    private String unit;
    private String supplierId;
    private String categoryId;
    private BigDecimal price;
    private BigDecimal costPrice;
    private BigDecimal commissionPercentage;
    private BigDecimal taxPercentage;
    private BigDecimal astPercentage;
    private Integer openingStock;
    private Integer blocked;
} 