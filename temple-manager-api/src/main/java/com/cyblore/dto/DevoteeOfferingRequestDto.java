package com.cyblore.dto;

import lombok.Data;
import java.time.LocalDate;
import java.util.List;

@Data
public class DevoteeOfferingRequestDto {
    private LocalDate transactionDate;
    private LocalDate offeringDate;
    private List<DevoteeOfferingItemDto> items;
} 