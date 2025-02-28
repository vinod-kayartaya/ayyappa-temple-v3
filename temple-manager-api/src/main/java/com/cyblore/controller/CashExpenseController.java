package com.cyblore.controller;

import com.cyblore.dto.CashExpenseRequestDto;
import com.cyblore.dto.CashExpenseResponseDto;
import com.cyblore.dto.ErrorResponse;
import com.cyblore.dto.SuccessResponse;
import com.cyblore.entity.ExpenseType;
import com.cyblore.exceptions.ResourceNotFoundException;
import com.cyblore.exceptions.ApplicationException;
import com.cyblore.service.CashExpenseService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.security.Principal;
import java.time.LocalDate;

@RestController
@RequestMapping("/api/cash-expenses")  // Changed from cash-vouchers
public class CashExpenseController {
    private final CashExpenseService service;
    private static final int DEFAULT_PAGE_SIZE = 10;

    public CashExpenseController(CashExpenseService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<Page<CashExpenseResponseDto>> getAllExpenses(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            @RequestParam(required = false) ExpenseType expenseType,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        Pageable pageable = PageRequest.of(page, size);
        
        if (startDate != null && endDate != null) {
            return ResponseEntity.ok(service.getExpensesByDateRange(startDate, endDate, expenseType, pageable));
        }
        return ResponseEntity.ok(service.getAllExpenses(expenseType, pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getExpense(@PathVariable String id) {
        try {
            return ResponseEntity.ok(service.getExpense(id));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(404)
                    .body(new ErrorResponse("Cash expense not found", "CE001"));
        }
    }

    @PostMapping
    public ResponseEntity<?> createExpense(
            @RequestBody CashExpenseRequestDto request,
            Principal principal) {
        try {
            return ResponseEntity.ok(service.createExpense(request, principal));
        } catch (ApplicationException e) {
            return ResponseEntity.status(400)
                    .body(new ErrorResponse(e.getMessage(), "CE002"));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateExpense(
            @PathVariable String id,
            @RequestBody CashExpenseRequestDto request,
            Principal principal) {
        try {
            return ResponseEntity.ok(service.updateExpense(id, request, principal));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(404)
                    .body(new ErrorResponse("Cash expense not found", "CE003"));
        } catch (ApplicationException e) {
            return ResponseEntity.status(400)
                    .body(new ErrorResponse(e.getMessage(), "CE004"));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteExpense(@PathVariable String id) {
        try {
            service.deleteExpense(id);
            return ResponseEntity.ok()
                    .body(new SuccessResponse("Cash expense deleted successfully"));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(404)
                    .body(new ErrorResponse("Cash expense not found", "CE005"));
        }
    }
} 