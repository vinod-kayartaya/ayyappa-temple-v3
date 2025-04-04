package com.cyblore.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class SaleItemResponseDto {
    private String id;
    private String productId;
    private Integer productCode;
    private String productName;
    private Integer quantity;
    private BigDecimal unitPrice;
    private BigDecimal totalPrice;
} 