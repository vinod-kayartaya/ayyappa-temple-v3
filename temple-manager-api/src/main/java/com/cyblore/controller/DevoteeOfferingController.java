package com.cyblore.controller;

import com.cyblore.dto.DevoteeOfferingRequestDto;
import com.cyblore.entity.DevoteeOffering;
import com.cyblore.service.DevoteeOfferingService;
import com.cyblore.exceptions.ResourceNotFoundException;
import com.cyblore.dto.ErrorResponse;
import com.cyblore.dto.SuccessResponse;
import com.cyblore.dto.DevoteeNameNakshtramDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.util.List;
import java.time.LocalDate;
import org.springframework.format.annotation.DateTimeFormat;

@RestController
@RequestMapping("/api/devotee-offerings")
public class DevoteeOfferingController {
    private final DevoteeOfferingService service;

    public DevoteeOfferingController(DevoteeOfferingService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<?> createOffering(@RequestBody DevoteeOfferingRequestDto request, Principal principal) {
        try {
            DevoteeOffering offering = service.createOffering(request, principal);
            return ResponseEntity.ok(offering);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(404)
                    .body(new ErrorResponse(e.getMessage(), "OFF001"));
        } catch (Exception e) {
            return ResponseEntity.status(500)
                    .body(new ErrorResponse("Failed to create offering", "OFF002"));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getOffering(@PathVariable String id) {
        try {
            DevoteeOffering offering = service.getOffering(id);
            return ResponseEntity.ok(offering);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(404)
                    .body(new ErrorResponse(e.getMessage(), "OFF003"));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteOffering(@PathVariable String id) {
        try {
            service.deleteOffering(id);
            return ResponseEntity.ok()
                    .body(new SuccessResponse("Offering deleted successfully"));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(404)
                    .body(new ErrorResponse(e.getMessage(), "OFF004"));
        }
    }

    @GetMapping("/devotee-names")
    public ResponseEntity<?> getDevoteeNames(@RequestParam String phoneNumber) {
        try {
            List<DevoteeNameNakshtramDto> names = service.getDevoteeNamesByPhoneNumber(phoneNumber);
            return ResponseEntity.ok(names);
        } catch (Exception e) {
            return ResponseEntity.status(500)
                    .body(new ErrorResponse("Failed to fetch devotee names", "OFF005"));
        }
    }

    @GetMapping
    public ResponseEntity<List<DevoteeOffering>> getAllOfferings(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {

        LocalDate today = LocalDate.now();
        startDate = startDate != null ? startDate : today;
        endDate = endDate != null ? endDate : today;

        return ResponseEntity.ok(service.getAllOfferings(startDate, endDate));
    }
}