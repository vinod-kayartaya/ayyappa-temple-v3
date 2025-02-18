package com.cyblore.controller;

import com.cyblore.dto.OfferingCategoryRequestDto;
import com.cyblore.dto.OfferingCategoryResponseDto;
import com.cyblore.dto.ErrorResponse;
import com.cyblore.service.OfferingCategoryService;
import com.cyblore.exceptions.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/offering-categories")
public class OfferingCategoryController {
    private final OfferingCategoryService service;

    public OfferingCategoryController(OfferingCategoryService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<OfferingCategoryResponseDto>> getAllOfferingCategories() {
        return ResponseEntity.ok(service.getAllOfferingCategories());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getOfferingCategory(@PathVariable String id) {
        try {
            return ResponseEntity.ok(service.getOfferingCategory(id));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(404)
                    .body(new ErrorResponse("Offering category not found", "OFC001"));
        }
    }

    @PostMapping
    public ResponseEntity<?> createOfferingCategory(@RequestBody OfferingCategoryRequestDto request, Principal principal) {
        return ResponseEntity.ok(service.createOfferingCategory(request, principal));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateOfferingCategory(
            @PathVariable String id,
            @RequestBody OfferingCategoryRequestDto request,
            Principal principal) {
        try {
            return ResponseEntity.ok(service.updateOfferingCategory(id, request, principal));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(404)
                    .body(new ErrorResponse("Offering category not found", "OFC002"));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteOfferingCategory(@PathVariable String id) {
        try {
            service.deleteOfferingCategory(id);
            return ResponseEntity.ok().build();
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(404)
                    .body(new ErrorResponse("Offering category not found", "OFC003"));
        }
    }
} 