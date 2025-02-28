package com.cyblore.service;

import com.cyblore.dto.ExpenseCategoryRequestDto;
import com.cyblore.dto.ExpenseCategoryResponseDto;
import com.cyblore.entity.ExpenseCategory;
import com.cyblore.repository.ExpenseCategoryRepository;
import com.cyblore.exceptions.ResourceNotFoundException;
import com.cyblore.exceptions.ApplicationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ExpenseCategoryService {
    private final ExpenseCategoryRepository repository;

    public ExpenseCategoryService(ExpenseCategoryRepository repository) {
        this.repository = repository;
    }

    public List<ExpenseCategoryResponseDto> getAllCategories() {
        return repository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public ExpenseCategoryResponseDto getCategory(String id) {
        return repository.findById(id)
                .map(this::mapToDto)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
    }

    @Transactional
    public ExpenseCategoryResponseDto createCategory(ExpenseCategoryRequestDto request, Principal principal) {
        if (repository.existsByNameIgnoreCase(request.getName())) {
            throw new ApplicationException("Category name already exists");
        }

        ExpenseCategory category = new ExpenseCategory();
        updateCategoryFromRequest(category, request);
        category.setCreatedBy(principal.getName());

        return mapToDto(repository.save(category));
    }

    @Transactional
    public ExpenseCategoryResponseDto updateCategory(String id, ExpenseCategoryRequestDto request, Principal principal) {
        if (repository.existsByNameIgnoreCaseAndIdNot(request.getName(), id)) {
            throw new ApplicationException("Category name already exists");
        }

        ExpenseCategory category = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

        updateCategoryFromRequest(category, request);
        category.setLastUpdatedBy(principal.getName());

        return mapToDto(repository.save(category));
    }

    private void updateCategoryFromRequest(ExpenseCategory category, ExpenseCategoryRequestDto request) {
        category.setName(request.getName());
        category.setDescription(request.getDescription());
    }

    private ExpenseCategoryResponseDto mapToDto(ExpenseCategory category) {
        ExpenseCategoryResponseDto dto = new ExpenseCategoryResponseDto();
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