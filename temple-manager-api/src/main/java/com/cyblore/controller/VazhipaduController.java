package com.cyblore.controller;

import com.cyblore.dto.VazhipaduRequestDto;
import com.cyblore.dto.VazhipaduResponseDto;
import com.cyblore.dto.ErrorResponse;
import com.cyblore.entity.Vazhipadu;
import com.cyblore.service.VazhipaduService;
import com.cyblore.exceptions.ResourceNotFoundException;
import com.cyblore.exceptions.ApplicationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/vazhipadu")
public class VazhipaduController {
    private final VazhipaduService service;

    public VazhipaduController(VazhipaduService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<VazhipaduResponseDto>> getAllVazhipadus() {
        return ResponseEntity.ok(service.getAllVazhipadus());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getVazhipadu(@PathVariable String id) {
        try {
            return ResponseEntity.ok(service.getVazhipadu(id));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(404)
                    .body(new ErrorResponse("Vazhipadu not found", "VZP001"));
        }
    }

    @PostMapping
    public ResponseEntity<?> createVazhipadu(@RequestBody VazhipaduRequestDto request, Principal principal) {
        try {
            return ResponseEntity.ok(service.createVazhipadu(request, principal));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(404)
                    .body(new ErrorResponse(e.getMessage(), "VZP002"));
        } catch (ApplicationException e) {
            return ResponseEntity.status(400)
                    .body(new ErrorResponse(e.getMessage(), "VZP003"));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateVazhipadu(
            @PathVariable String id,
            @RequestBody VazhipaduRequestDto request,
            Principal principal) {
        try {
            return ResponseEntity.ok(service.updateVazhipadu(id, request, principal));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(404)
                    .body(new ErrorResponse(e.getMessage(), "VZP004"));
        } catch (ApplicationException e) {
            return ResponseEntity.status(400)
                    .body(new ErrorResponse(e.getMessage(), "VZP005"));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteVazhipadu(@PathVariable String id) {
        try {
            service.deleteVazhipadu(id);
            return ResponseEntity.ok().build();
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(404)
                    .body(new ErrorResponse("Vazhipadu not found", "VZP006"));
        }
    }

    @GetMapping("/by-code/{code}")
    public ResponseEntity<?> getVazhipaduByCode(@PathVariable Integer code) {
        try {
            Vazhipadu vazhipadu = service.getVazhipaduByCode(code);
            return ResponseEntity.ok(vazhipadu);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(404)
                    .body(new ErrorResponse(e.getMessage(), "VAZ005"));
        } catch (Exception e) {
            return ResponseEntity.status(500)
                    .body(new ErrorResponse("Failed to fetch vazhipadu", "VAZ006"));
        }
    }
} 