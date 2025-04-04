package com.cyblore.controller;

import com.cyblore.dto.ErrorResponse;
import com.cyblore.dto.SaleRequestDto;
import com.cyblore.dto.SaleResponseDto;
import com.cyblore.dto.SuccessResponse;
import com.cyblore.exceptions.ApplicationException;
import com.cyblore.exceptions.ResourceNotFoundException;
import com.cyblore.service.SaleService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@RestController
@RequestMapping("/api/sales")
public class SaleController {

    private final SaleService saleService;

    public SaleController(SaleService saleService) {
        this.saleService = saleService;
    }

    @GetMapping
    public ResponseEntity<Page<SaleResponseDto>> getAllSales(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            @RequestParam(required = false) String customerName,
            @RequestParam(required = false) String customerMobile,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        Pageable pageable = PageRequest.of(page, size);
        
        if (startDate != null && endDate != null) {
            // Convert LocalDate to LocalDateTime (start of day and end of day)
            LocalDateTime startDateTime = startDate.atStartOfDay();
            LocalDateTime endDateTime = endDate.atTime(LocalTime.MAX);
            return ResponseEntity.ok(saleService.getSalesByDateRange(startDateTime, endDateTime, pageable));
        } else if (customerName != null) {
            return ResponseEntity.ok(saleService.getSalesByCustomerName(customerName, pageable));
        } else if (customerMobile != null) {
            return ResponseEntity.ok(saleService.getSalesByCustomerMobile(customerMobile, pageable));
        }
        
        return ResponseEntity.ok(saleService.getAllSales(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getSale(@PathVariable String id) {
        try {
            return ResponseEntity.ok(saleService.getSale(id));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(404)
                    .body(new ErrorResponse("Sale not found", "S001"));
        }
    }

    @PostMapping
    public ResponseEntity<?> createSale(
            @RequestBody SaleRequestDto request,
            Principal principal) {
        try {
            return ResponseEntity.ok(saleService.createSale(request, principal));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(404)
                    .body(new ErrorResponse(e.getMessage(), "S002"));
        } catch (ApplicationException e) {
            return ResponseEntity.status(400)
                    .body(new ErrorResponse(e.getMessage(), "S003"));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateSale(
            @PathVariable String id,
            @RequestBody SaleRequestDto request,
            Principal principal) {
        try {
            return ResponseEntity.ok(saleService.updateSale(id, request, principal));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(404)
                    .body(new ErrorResponse(e.getMessage(), "S004"));
        } catch (ApplicationException e) {
            return ResponseEntity.status(400)
                    .body(new ErrorResponse(e.getMessage(), "S005"));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSale(@PathVariable String id) {
        try {
            saleService.deleteSale(id);
            return ResponseEntity.ok()
                    .body(new SuccessResponse("Sale deleted successfully"));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(404)
                    .body(new ErrorResponse("Sale not found", "S006"));
        }
    }
} 