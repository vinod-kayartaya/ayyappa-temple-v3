package com.cyblore.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class DevoteeOfferingResponseDto {
    private Long id;
    private String billNumber;  // For displaying Bill #
    private LocalDate transactionDate;
    private LocalDate offeringDate;
    private String createdBy;
    private LocalDateTime createdAt;
    private String lastUpdatedBy;
    private LocalDateTime lastUpdatedAt;
    private List<DevoteeOfferingItemResponseDto> items;
    private BigDecimal totalAmount;  // For displaying Total Amount

    @Data
    public static class DevoteeOfferingItemResponseDto {
        private String id;
        private String devoteeMobileNumber;
        private String vazhipaduId;
        private String vazhipaduName;
        private Integer vazhipaduCode;
        private String devoteeName;
        private String devoteeNakshtram;
        private String deityName;
        private Integer nos;
        private BigDecimal amount;
    }
} 