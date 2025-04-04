package com.cyblore.dto;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class SaleRequestDto {
    private String customerName;
    private String customerMobile;
    private LocalDateTime saleDate;
    private List<SaleItemRequestDto> items;
} 