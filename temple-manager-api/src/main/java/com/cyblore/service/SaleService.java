package com.cyblore.service;

import com.cyblore.dto.SaleRequestDto;
import com.cyblore.dto.SaleResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.security.Principal;
import java.time.LocalDateTime;

public interface SaleService {
    SaleResponseDto createSale(SaleRequestDto saleRequestDto, Principal principal);
    SaleResponseDto getSale(String id);
    Page<SaleResponseDto> getAllSales(Pageable pageable);
    Page<SaleResponseDto> getSalesByDateRange(LocalDateTime startDate, LocalDateTime endDate, Pageable pageable);
    Page<SaleResponseDto> getSalesByCustomerName(String customerName, Pageable pageable);
    Page<SaleResponseDto> getSalesByCustomerMobile(String customerMobile, Pageable pageable);
    SaleResponseDto updateSale(String id, SaleRequestDto saleRequestDto, Principal principal);
    void deleteSale(String id);
} 