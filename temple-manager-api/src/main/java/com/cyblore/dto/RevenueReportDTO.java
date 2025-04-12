package com.cyblore.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class RevenueReportDTO {
    private LocalDate date;
    private String offeringType;
    private Integer totalCount;
    private Double totalAmount;
} 