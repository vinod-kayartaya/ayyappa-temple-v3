package com.cyblore.dto;

import lombok.Data;

@Data
public class MonthlyRevenueReportDTO {
    private String monthYear;
    private String offeringType;
    private Integer totalCount;
    private Double totalAmount;
} 