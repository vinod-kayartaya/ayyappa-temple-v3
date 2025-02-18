package com.cyblore.controller;

import com.cyblore.dto.DeityRequestDto;
import com.cyblore.dto.DeityResponseDto;
import com.cyblore.dto.ErrorResponse;
import com.cyblore.service.DeityService;
import com.cyblore.exceptions.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/deities")
public class DeityController {
    private final DeityService service;

    public DeityController(DeityService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<DeityResponseDto>> getAllDeities() {
        return ResponseEntity.ok(service.getAllDeities());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getDeity(@PathVariable String id) {
        try {
            return ResponseEntity.ok(service.getDeity(id));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(404)
                    .body(new ErrorResponse("Deity not found", "DEI001"));
        }
    }

    @PostMapping
    public ResponseEntity<?> createDeity(@RequestBody DeityRequestDto request, Principal principal) {
        return ResponseEntity.ok(service.createDeity(request, principal));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateDeity(
            @PathVariable String id,
            @RequestBody DeityRequestDto request) {
        try {
            return ResponseEntity.ok(service.updateDeity(id, request));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(404)
                    .body(new ErrorResponse("Deity not found", "DEI002"));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDeity(@PathVariable String id) {
        try {
            service.deleteDeity(id);
            return ResponseEntity.ok().build();
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(404)
                    .body(new ErrorResponse("Deity not found", "DEI003"));
        }
    }
} 