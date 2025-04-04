package com.cyblore.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class DonationRequestDto {
    private String donationCategoryId;
    private String devoteeName;
    private String devoteePhone;
    private String devoteeEmail;
    private String devoteeAddress;
    private BigDecimal amount;
    private String paymentMode;
    private String paymentReference;
    private LocalDate donationDate;
    private String remarks;
} 