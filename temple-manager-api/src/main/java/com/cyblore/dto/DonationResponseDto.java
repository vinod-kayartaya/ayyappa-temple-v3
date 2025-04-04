package com.cyblore.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class DonationResponseDto {
    private String id;
    private String donationCategoryId;
    private String donationCategoryName;
    private String devoteeName;
    private String devoteePhone;
    private String devoteeEmail;
    private String devoteeAddress;
    private BigDecimal amount;
    private String paymentMode;
    private String paymentReference;
    private String receiptNumber;
    private LocalDate donationDate;
    private String remarks;
    private String createdBy;
    private LocalDateTime createdAt;
    private String lastUpdatedBy;
    private LocalDateTime lastUpdatedAt;
} 