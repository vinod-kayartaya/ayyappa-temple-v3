package com.cyblore.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class VazhipaduRequestDto {
    private Integer code;
    private String vazhipaduName;
    private BigDecimal amount;
    private Integer dailyCount;
    private Integer timeAmPm;
    private Integer timesPerDay;
    private Integer days;
    private Boolean blocking;
    private Boolean seasonal;
    private String offeringCategoryId;
    private Boolean receipt;
    private Boolean bookingRequired;
    private String accountHeadId;
    private String accountSubHeadId;
} 