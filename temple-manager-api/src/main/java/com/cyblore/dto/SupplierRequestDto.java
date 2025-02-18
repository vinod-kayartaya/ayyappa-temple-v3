package com.cyblore.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class SupplierRequestDto {
    private Integer code;
    private String name;
    private String shortForm;
    private String type;
    private String address;
    private String phone;
    private String email;
    private Integer reorderLevel;
    private BigDecimal marginPercentage;
} 