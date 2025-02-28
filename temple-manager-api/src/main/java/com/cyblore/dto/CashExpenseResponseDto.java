package com.cyblore.dto;

import com.cyblore.entity.ExpenseType;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class CashExpenseResponseDto {
    private String id;
    private Integer voucherNo;
    private LocalDate voucherDate;
    private String paidTo;
    private BigDecimal amount;
    private String purpose;
    private ExpenseType expenseType;
    private UserDto approvedBy;
    private String createdBy;
    private LocalDateTime createdAt;
    private String lastUpdatedBy;
    private LocalDateTime lastUpdatedAt;
    private ExpenseCategoryResponseDto category;
} 