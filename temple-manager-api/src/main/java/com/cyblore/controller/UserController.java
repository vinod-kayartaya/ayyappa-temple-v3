package com.cyblore.controller;

import com.cyblore.dto.UserRequestDto;
import com.cyblore.dto.UserResponseDto;
import com.cyblore.dto.ErrorResponse;
import com.cyblore.service.UserService;
import com.cyblore.exceptions.ResourceNotFoundException;
import com.cyblore.exceptions.ApplicationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<UserResponseDto>> getAllUsers() {
        return ResponseEntity.ok(service.getAllUsers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUser(@PathVariable Integer id) {
        try {
            return ResponseEntity.ok(service.getUser(id));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(404)
                    .body(new ErrorResponse("User not found", "USR001"));
        }
    }

    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody UserRequestDto request, Principal principal) {
        try {
            return ResponseEntity.ok(service.createUser(request, principal));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(404)
                    .body(new ErrorResponse(e.getMessage(), "USR002"));
        } catch (ApplicationException e) {
            return ResponseEntity.status(400)
                    .body(new ErrorResponse(e.getMessage(), "USR003"));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(
            @PathVariable Integer id,
            @RequestBody UserRequestDto request,
            Principal principal) {
        try {
            return ResponseEntity.ok(service.updateUser(id, request, principal));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(404)
                    .body(new ErrorResponse(e.getMessage(), "USR004"));
        } catch (ApplicationException e) {
            return ResponseEntity.status(400)
                    .body(new ErrorResponse(e.getMessage(), "USR005"));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Integer id) {
        try {
            service.deleteUser(id);
            return ResponseEntity.ok().build();
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(404)
                    .body(new ErrorResponse("User not found", "USR006"));
        }
    }
} 