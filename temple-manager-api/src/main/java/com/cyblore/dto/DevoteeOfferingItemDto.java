package com.cyblore.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class DevoteeOfferingItemDto {
    private String devoteeMobileNumber;
    private String vazhipaduId;
    private String devoteeName;
    private String devoteeNakshtram;
    private String deityName;
    private Integer nos;
    private BigDecimal amount;
} 