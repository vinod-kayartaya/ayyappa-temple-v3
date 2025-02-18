package com.cyblore.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class VazhipaduResponseDto {
    private String id;
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
    private String offeringCategoryName;
    private Boolean receipt;
    private Boolean bookingRequired;
    private String accountHeadId;
    private String accountHeadName;
    private String accountSubHeadId;
    private String accountSubHeadName;
    private String createdBy;
    private LocalDateTime createdAt;
    private String lastUpdatedBy;
    private LocalDateTime lastUpdatedAt;
} 