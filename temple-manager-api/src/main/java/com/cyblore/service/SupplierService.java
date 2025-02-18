package com.cyblore.service;

import com.cyblore.dto.SupplierRequestDto;
import com.cyblore.dto.SupplierResponseDto;
import com.cyblore.entity.Supplier;
import com.cyblore.repository.SupplierRepository;
import com.cyblore.exceptions.ResourceNotFoundException;
import com.cyblore.exceptions.ApplicationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SupplierService {
    private final SupplierRepository repository;

    public SupplierService(SupplierRepository repository) {
        this.repository = repository;
    }

    public List<SupplierResponseDto> getAllSuppliers() {
        return repository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public SupplierResponseDto getSupplier(String id) {
        return repository.findById(id)
                .map(this::mapToDto)
                .orElseThrow(() -> new ResourceNotFoundException("Supplier not found"));
    }

    @Transactional
    public SupplierResponseDto createSupplier(SupplierRequestDto request, Principal principal) {
        if (repository.existsByCode(request.getCode())) {
            throw new ApplicationException("Supplier code already exists");
        }

        Supplier supplier = new Supplier();
        updateSupplierFromDto(supplier, request);
        supplier.setCreatedBy(principal.getName());

        return mapToDto(repository.save(supplier));
    }

    @Transactional
    public SupplierResponseDto updateSupplier(String id, SupplierRequestDto request, Principal principal) {
        Supplier supplier = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Supplier not found"));

        if (repository.existsByCodeAndIdNot(request.getCode(), id)) {
            throw new ApplicationException("Supplier code already exists");
        }

        updateSupplierFromDto(supplier, request);
        supplier.setLastUpdatedBy(principal.getName());

        return mapToDto(repository.save(supplier));
    }

    @Transactional
    public void deleteSupplier(String id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Supplier not found");
        }
        repository.deleteById(id);
    }

    private void updateSupplierFromDto(Supplier supplier, SupplierRequestDto dto) {
        supplier.setCode(dto.getCode());
        supplier.setName(dto.getName());
        supplier.setShortForm(dto.getShortForm());
        supplier.setType(dto.getType());
        supplier.setAddress(dto.getAddress());
        supplier.setPhone(dto.getPhone());
        supplier.setEmail(dto.getEmail());
        supplier.setReorderLevel(dto.getReorderLevel());
        supplier.setMarginPercentage(dto.getMarginPercentage());
    }

    private SupplierResponseDto mapToDto(Supplier supplier) {
        SupplierResponseDto dto = new SupplierResponseDto();
        dto.setId(supplier.getId());
        dto.setCode(supplier.getCode());
        dto.setName(supplier.getName());
        dto.setShortForm(supplier.getShortForm());
        dto.setType(supplier.getType());
        dto.setAddress(supplier.getAddress());
        dto.setPhone(supplier.getPhone());
        dto.setEmail(supplier.getEmail());
        dto.setReorderLevel(supplier.getReorderLevel());
        dto.setMarginPercentage(supplier.getMarginPercentage());
        dto.setCreatedBy(supplier.getCreatedBy());
        dto.setCreatedAt(supplier.getCreatedAt());
        dto.setLastUpdatedBy(supplier.getLastUpdatedBy());
        dto.setLastUpdatedAt(supplier.getLastUpdatedAt());
        return dto;
    }
} 