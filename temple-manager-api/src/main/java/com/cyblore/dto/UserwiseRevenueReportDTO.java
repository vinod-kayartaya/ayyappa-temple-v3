package com.cyblore.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class UserwiseRevenueReportDTO {
    private String user;
    private LocalDate date;
    private Long billNo;
    private Double totalAmount;
} 