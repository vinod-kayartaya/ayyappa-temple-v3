package com.cyblore.service;

import com.cyblore.dto.DonationCategoryRequestDto;
import com.cyblore.dto.DonationCategoryResponseDto;
import com.cyblore.entity.DonationCategory;
import com.cyblore.repository.DonationCategoryRepository;
import com.cyblore.exceptions.ResourceNotFoundException;
import com.cyblore.exceptions.ApplicationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DonationCategoryService {
    private final DonationCategoryRepository repository;

    public DonationCategoryService(DonationCategoryRepository repository) {
        this.repository = repository;
    }

    public List<DonationCategoryResponseDto> getAllDonationCategories() {
        return repository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public DonationCategoryResponseDto getDonationCategory(String id) {
        return repository.findById(id)
                .map(this::mapToDto)
                .orElseThrow(() -> new ResourceNotFoundException("Donation category not found"));
    }

    @Transactional
    public DonationCategoryResponseDto createDonationCategory(DonationCategoryRequestDto request, Principal principal) {
        if (repository.existsByNameIgnoreCase(request.getName())) {
            throw new ApplicationException("Donation category name already exists");
        }

        DonationCategory category = new DonationCategory();
        updateCategoryFromRequest(category, request);
        category.setCreatedBy(principal.getName());

        return mapToDto(repository.save(category));
    }

    @Transactional
    public DonationCategoryResponseDto updateDonationCategory(String id, DonationCategoryRequestDto request, Principal principal) {
        DonationCategory category = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Donation category not found"));

        if (!category.getName().equalsIgnoreCase(request.getName()) && 
                repository.existsByNameIgnoreCase(request.getName())) {
            throw new ApplicationException("Donation category name already exists");
        }

        updateCategoryFromRequest(category, request);
        category.setLastUpdatedBy(principal.getName());

        return mapToDto(repository.save(category));
    }

    @Transactional
    public void deleteDonationCategory(String id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Donation category not found");
        }
        repository.deleteById(id);
    }

    private void updateCategoryFromRequest(DonationCategory category, DonationCategoryRequestDto request) {
        category.setName(request.getName());
        category.setDescription(request.getDescription());
    }

    private DonationCategoryResponseDto mapToDto(DonationCategory category) {
        DonationCategoryResponseDto dto = new DonationCategoryResponseDto();
        dto.setId(category.getId());
        dto.setName(category.getName());
        dto.setDescription(category.getDescription());
        dto.setCreatedBy(category.getCreatedBy());
        dto.setCreatedAt(category.getCreatedAt());
        dto.setLastUpdatedBy(category.getLastUpdatedBy());
        dto.setLastUpdatedAt(category.getLastUpdatedAt());
        return dto;
    }
} 