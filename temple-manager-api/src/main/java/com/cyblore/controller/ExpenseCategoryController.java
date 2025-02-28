package com.cyblore.controller;

import com.cyblore.dto.ExpenseCategoryRequestDto;
import com.cyblore.dto.ExpenseCategoryResponseDto;
import com.cyblore.dto.ErrorResponse;
import com.cyblore.dto.SuccessResponse;
import com.cyblore.exceptions.ResourceNotFoundException;
import com.cyblore.exceptions.ApplicationException;
import com.cyblore.service.ExpenseCategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/expense-categories")
public class ExpenseCategoryController {
    private final ExpenseCategoryService service;

    public ExpenseCategoryController(ExpenseCategoryService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<ExpenseCategoryResponseDto>> getAllCategories() {
        return ResponseEntity.ok(service.getAllCategories());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCategory(@PathVariable String id) {
        try {
            return ResponseEntity.ok(service.getCategory(id));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(404)
                    .body(new ErrorResponse("Category not found", "EC001"));
        }
    }

    @PostMapping
    public ResponseEntity<?> createCategory(
            @RequestBody ExpenseCategoryRequestDto request,
            Principal principal) {
        try {
            return ResponseEntity.ok(service.createCategory(request, principal));
        } catch (ApplicationException e) {
            return ResponseEntity.status(400)
                    .body(new ErrorResponse(e.getMessage(), "EC002"));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCategory(
            @PathVariable String id,
            @RequestBody ExpenseCategoryRequestDto request,
            Principal principal) {
        try {
            return ResponseEntity.ok(service.updateCategory(id, request, principal));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(404)
                    .body(new ErrorResponse("Category not found", "EC003"));
        } catch (ApplicationException e) {
            return ResponseEntity.status(400)
                    .body(new ErrorResponse(e.getMessage(), "EC004"));
        }
    }
} 