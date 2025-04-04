package com.cyblore.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class SaleItemRequestDto {
    private String productId;
    private Integer quantity;
    private BigDecimal unitPrice;
} 