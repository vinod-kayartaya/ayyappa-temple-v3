package com.cyblore.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class SaleResponseDto {
    private String id;
    private String customerName;
    private String customerMobile;
    private LocalDateTime saleDate;
    private BigDecimal totalAmount;
    private String createdBy;
    private LocalDateTime createdAt;
    private List<SaleItemResponseDto> items;
} 