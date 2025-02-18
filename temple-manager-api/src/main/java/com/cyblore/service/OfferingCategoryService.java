package com.cyblore.service;

import com.cyblore.dto.OfferingCategoryRequestDto;
import com.cyblore.dto.OfferingCategoryResponseDto;
import com.cyblore.entity.OfferingCategory;
import com.cyblore.repository.OfferingCategoryRepository;
import com.cyblore.exceptions.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OfferingCategoryService {
    private final OfferingCategoryRepository repository;

    public OfferingCategoryService(OfferingCategoryRepository repository) {
        this.repository = repository;
    }

    public List<OfferingCategoryResponseDto> getAllOfferingCategories() {
        return repository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public OfferingCategoryResponseDto getOfferingCategory(String id) {
        return repository.findById(id)
                .map(this::mapToDto)
                .orElseThrow(() -> new ResourceNotFoundException("Offering category not found"));
    }

    @Transactional
    public OfferingCategoryResponseDto createOfferingCategory(OfferingCategoryRequestDto request, Principal principal) {
        OfferingCategory category = new OfferingCategory();
        category.setName(request.getName());
        category.setCreatedBy(principal.getName());

        return mapToDto(repository.save(category));
    }

    @Transactional
    public OfferingCategoryResponseDto updateOfferingCategory(String id, OfferingCategoryRequestDto request, Principal principal) {
        OfferingCategory category = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Offering category not found"));

        category.setName(request.getName());
        category.setLastUpdatedBy(principal.getName());

        return mapToDto(repository.save(category));
    }

    @Transactional
    public void deleteOfferingCategory(String id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Offering category not found");
        }
        repository.deleteById(id);
    }

    private OfferingCategoryResponseDto mapToDto(OfferingCategory category) {
        OfferingCategoryResponseDto dto = new OfferingCategoryResponseDto();
        dto.setId(category.getId());
        dto.setName(category.getName());
        dto.setCreatedBy(category.getCreatedBy());
        dto.setCreatedAt(category.getCreatedAt());
        dto.setLastUpdatedBy(category.getLastUpdatedBy());
        dto.setLastUpdatedAt(category.getLastUpdatedAt());
        return dto;
    }
} 