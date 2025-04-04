package com.cyblore.controller;

import com.cyblore.dto.ProductRequestDto;
import com.cyblore.dto.ProductResponseDto;
import com.cyblore.dto.ErrorResponse;
import com.cyblore.service.ProductService;
import com.cyblore.exceptions.ResourceNotFoundException;
import com.cyblore.exceptions.ApplicationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    private final ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<ProductResponseDto>> getAllProducts() {
        return ResponseEntity.ok(service.getAllProducts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProduct(@PathVariable String id) {
        try {
            return ResponseEntity.ok(service.getProduct(id));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(404)
                    .body(new ErrorResponse("Product not found", "PRD001"));
        }
    }

    @GetMapping("/code/{code}")
    public ResponseEntity<?> getProductByCode(@PathVariable Integer code) {
        try {
            return ResponseEntity.ok(service.getProductByCode(code));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(404)
                    .body(new ErrorResponse(e.getMessage(), "PRD007"));
        }
    }

    @PostMapping
    public ResponseEntity<?> createProduct(@RequestBody ProductRequestDto request, Principal principal) {
        try {
            return ResponseEntity.ok(service.createProduct(request, principal));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(404)
                    .body(new ErrorResponse(e.getMessage(), "PRD002"));
        } catch (ApplicationException e) {
            return ResponseEntity.status(400)
                    .body(new ErrorResponse(e.getMessage(), "PRD003"));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProduct(
            @PathVariable String id,
            @RequestBody ProductRequestDto request,
            Principal principal) {
        try {
            return ResponseEntity.ok(service.updateProduct(id, request, principal));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(404)
                    .body(new ErrorResponse(e.getMessage(), "PRD004"));
        } catch (ApplicationException e) {
            return ResponseEntity.status(400)
                    .body(new ErrorResponse(e.getMessage(), "PRD005"));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable String id) {
        try {
            service.deleteProduct(id);
            return ResponseEntity.ok().build();
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(404)
                    .body(new ErrorResponse("Product not found", "PRD006"));
        }
    }
} 