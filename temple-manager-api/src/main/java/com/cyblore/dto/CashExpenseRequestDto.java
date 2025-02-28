package com.cyblore.dto;

import com.cyblore.entity.ExpenseType;
import com.fasterxml.jackson.annotation.JsonAlias;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class CashExpenseRequestDto {
    private Integer voucherNo;
    private LocalDate voucherDate;
    private String paidTo;
    private BigDecimal amount;
    private String purpose;
    private ExpenseType expenseType;
    
    @JsonAlias("approvedBy")
    private String approvedById;

    private String categoryId;
} 