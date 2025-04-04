package com.cyblore.controller;

import com.cyblore.dto.DonationCategoryRequestDto;
import com.cyblore.dto.DonationCategoryResponseDto;
import com.cyblore.dto.ErrorResponse;
import com.cyblore.service.DonationCategoryService;
import com.cyblore.exceptions.ResourceNotFoundException;
import com.cyblore.exceptions.ApplicationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/donation-categories")
public class DonationCategoryController {
    private final DonationCategoryService service;

    public DonationCategoryController(DonationCategoryService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<DonationCategoryResponseDto>> getAllDonationCategories() {
        return ResponseEntity.ok(service.getAllDonationCategories());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getDonationCategory(@PathVariable String id) {
        try {
            return ResponseEntity.ok(service.getDonationCategory(id));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(404)
                    .body(new ErrorResponse("Donation category not found", "DON001"));
        }
    }

    @PostMapping
    public ResponseEntity<?> createDonationCategory(@RequestBody DonationCategoryRequestDto request, Principal principal) {
        try {
            return ResponseEntity.ok(service.createDonationCategory(request, principal));
        } catch (ApplicationException e) {
            return ResponseEntity.status(400)
                    .body(new ErrorResponse(e.getMessage(), "DON002"));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateDonationCategory(
            @PathVariable String id,
            @RequestBody DonationCategoryRequestDto request,
            Principal principal) {
        try {
            return ResponseEntity.ok(service.updateDonationCategory(id, request, principal));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(404)
                    .body(new ErrorResponse("Donation category not found", "DON003"));
        } catch (ApplicationException e) {
            return ResponseEntity.status(400)
                    .body(new ErrorResponse(e.getMessage(), "DON004"));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDonationCategory(@PathVariable String id) {
        try {
            service.deleteDonationCategory(id);
            return ResponseEntity.ok().build();
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(404)
                    .body(new ErrorResponse("Donation category not found", "DON005"));
        }
    }
} 