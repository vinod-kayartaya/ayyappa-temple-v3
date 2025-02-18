package com.cyblore.controller;

import com.cyblore.dto.RoleRequestDto;
import com.cyblore.dto.RoleResponseDto;
import com.cyblore.dto.ErrorResponse;
import com.cyblore.service.RoleService;
import com.cyblore.exceptions.ResourceNotFoundException;
import com.cyblore.exceptions.ApplicationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/roles")
public class RoleController {
    private final RoleService service;

    public RoleController(RoleService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<RoleResponseDto>> getAllRoles() {
        return ResponseEntity.ok(service.getAllRoles());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getRole(@PathVariable Integer id) {
        try {
            return ResponseEntity.ok(service.getRole(id));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(404)
                    .body(new ErrorResponse("Role not found", "ROL001"));
        }
    }

    @PostMapping
    public ResponseEntity<?> createRole(@RequestBody RoleRequestDto request, Principal principal) {
        try {
            return ResponseEntity.ok(service.createRole(request, principal));
        } catch (ApplicationException e) {
            return ResponseEntity.status(400)
                    .body(new ErrorResponse(e.getMessage(), "ROL002"));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateRole(
            @PathVariable Integer id,
            @RequestBody RoleRequestDto request,
            Principal principal) {
        try {
            return ResponseEntity.ok(service.updateRole(id, request, principal));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(404)
                    .body(new ErrorResponse(e.getMessage(), "ROL003"));
        } catch (ApplicationException e) {
            return ResponseEntity.status(400)
                    .body(new ErrorResponse(e.getMessage(), "ROL004"));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteRole(@PathVariable Integer id) {
        try {
            service.deleteRole(id);
            return ResponseEntity.ok().build();
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(404)
                    .body(new ErrorResponse("Role not found", "ROL005"));
        }
    }
} 