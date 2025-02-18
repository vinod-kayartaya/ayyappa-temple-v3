package com.cyblore.controller;

import com.cyblore.dto.CategoryRequestDto;
import com.cyblore.dto.CategoryResponseDto;
import com.cyblore.dto.ErrorResponse;
import com.cyblore.service.CategoryService;
import com.cyblore.exceptions.ResourceNotFoundException;
import com.cyblore.exceptions.ApplicationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {
    private final CategoryService service;

    public CategoryController(CategoryService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<CategoryResponseDto>> getAllCategories() {
        return ResponseEntity.ok(service.getAllCategories());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCategory(@PathVariable String id) {
        try {
            return ResponseEntity.ok(service.getCategory(id));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(404)
                    .body(new ErrorResponse("Category not found", "CAT001"));
        }
    }

    @PostMapping
    public ResponseEntity<?> createCategory(@RequestBody CategoryRequestDto request, Principal principal) {
        try {
            return ResponseEntity.ok(service.createCategory(request, principal));
        } catch (ApplicationException e) {
            return ResponseEntity.status(400)
                    .body(new ErrorResponse(e.getMessage(), "CAT002"));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCategory(
            @PathVariable String id,
            @RequestBody CategoryRequestDto request,
            Principal principal) {
        try {
            return ResponseEntity.ok(service.updateCategory(id, request, principal));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(404)
                    .body(new ErrorResponse("Category not found", "CAT003"));
        } catch (ApplicationException e) {
            return ResponseEntity.status(400)
                    .body(new ErrorResponse(e.getMessage(), "CAT004"));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable String id) {
        try {
            service.deleteCategory(id);
            return ResponseEntity.ok().build();
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(404)
                    .body(new ErrorResponse("Category not found", "CAT005"));
        }
    }
} 