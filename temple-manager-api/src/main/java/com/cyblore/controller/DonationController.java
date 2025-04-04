package com.cyblore.controller;

import com.cyblore.dto.DonationRequestDto;
import com.cyblore.dto.DonationResponseDto;
import com.cyblore.dto.ErrorResponse;
import com.cyblore.service.DonationService;
import com.cyblore.exceptions.ResourceNotFoundException;
import com.cyblore.exceptions.ApplicationException;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.time.LocalDate;

@RestController
@RequestMapping("/api/donations")
public class DonationController {
    private final DonationService service;
    private static final int DEFAULT_PAGE_SIZE = 10;

    public DonationController(DonationService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<Page<DonationResponseDto>> getAllDonations(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        Pageable pageable = PageRequest.of(page, size);
        
        if (startDate != null && endDate != null) {
            return ResponseEntity.ok(service.getDonationsByDateRange(startDate, endDate, pageable));
        }
        return ResponseEntity.ok(service.getAllDonations(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getDonation(@PathVariable String id) {
        try {
            return ResponseEntity.ok(service.getDonation(id));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(404)
                    .body(new ErrorResponse("Donation not found", "DON001"));
        }
    }

    @PostMapping
    public ResponseEntity<?> createDonation(@RequestBody DonationRequestDto request, Principal principal) {
        try {
            return ResponseEntity.ok(service.createDonation(request, principal));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(404)
                    .body(new ErrorResponse(e.getMessage(), "DON002"));
        } catch (ApplicationException e) {
            return ResponseEntity.status(400)
                    .body(new ErrorResponse(e.getMessage(), "DON003"));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateDonation(
            @PathVariable String id,
            @RequestBody DonationRequestDto request,
            Principal principal) {
        try {
            return ResponseEntity.ok(service.updateDonation(id, request, principal));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(404)
                    .body(new ErrorResponse(e.getMessage(), "DON004"));
        } catch (ApplicationException e) {
            return ResponseEntity.status(400)
                    .body(new ErrorResponse(e.getMessage(), "DON005"));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDonation(@PathVariable String id) {
        try {
            service.deleteDonation(id);
            return ResponseEntity.ok().build();
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(404)
                    .body(new ErrorResponse("Donation not found", "DON006"));
        }
    }
} 