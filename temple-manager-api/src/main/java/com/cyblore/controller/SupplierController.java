package com.cyblore.controller;

import com.cyblore.dto.SupplierRequestDto;
import com.cyblore.dto.SupplierResponseDto;
import com.cyblore.dto.ErrorResponse;
import com.cyblore.service.SupplierService;
import com.cyblore.exceptions.ResourceNotFoundException;
import com.cyblore.exceptions.ApplicationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/suppliers")
public class SupplierController {
    private final SupplierService service;

    public SupplierController(SupplierService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<SupplierResponseDto>> getAllSuppliers() {
        return ResponseEntity.ok(service.getAllSuppliers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getSupplier(@PathVariable String id) {
        try {
            return ResponseEntity.ok(service.getSupplier(id));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(404)
                    .body(new ErrorResponse("Supplier not found", "SUP001"));
        }
    }

    @PostMapping
    public ResponseEntity<?> createSupplier(@RequestBody SupplierRequestDto request, Principal principal) {
        try {
            return ResponseEntity.ok(service.createSupplier(request, principal));
        } catch (ApplicationException e) {
            return ResponseEntity.status(400)
                    .body(new ErrorResponse(e.getMessage(), "SUP002"));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateSupplier(
            @PathVariable String id,
            @RequestBody SupplierRequestDto request,
            Principal principal) {
        try {
            return ResponseEntity.ok(service.updateSupplier(id, request, principal));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(404)
                    .body(new ErrorResponse("Supplier not found", "SUP003"));
        } catch (ApplicationException e) {
            return ResponseEntity.status(400)
                    .body(new ErrorResponse(e.getMessage(), "SUP004"));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSupplier(@PathVariable String id) {
        try {
            service.deleteSupplier(id);
            return ResponseEntity.ok().build();
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(404)
                    .body(new ErrorResponse("Supplier not found", "SUP005"));
        }
    }
} 