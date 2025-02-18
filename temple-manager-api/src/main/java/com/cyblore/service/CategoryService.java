package com.cyblore.service;

import com.cyblore.dto.CategoryRequestDto;
import com.cyblore.dto.CategoryResponseDto;
import com.cyblore.entity.Category;
import com.cyblore.repository.CategoryRepository;
import com.cyblore.exceptions.ResourceNotFoundException;
import com.cyblore.exceptions.ApplicationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryService {
    private final CategoryRepository repository;

    public CategoryService(CategoryRepository repository) {
        this.repository = repository;
    }

    public List<CategoryResponseDto> getAllCategories() {
        return repository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public CategoryResponseDto getCategory(String id) {
        return repository.findById(id)
                .map(this::mapToDto)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
    }

    @Transactional
    public CategoryResponseDto createCategory(CategoryRequestDto request, Principal principal) {
        if (repository.existsByCode(request.getCode())) {
            throw new ApplicationException("Category code already exists");
        }

        Category category = new Category();
        category.setCode(request.getCode());
        category.setName(request.getName());
        category.setDescription(request.getDescription());
        category.setCreatedBy(principal.getName());

        return mapToDto(repository.save(category));
    }

    @Transactional
    public CategoryResponseDto updateCategory(String id, CategoryRequestDto request, Principal principal) {
        Category category = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

        if (repository.existsByCodeAndIdNot(request.getCode(), id)) {
            throw new ApplicationException("Category code already exists");
        }

        category.setCode(request.getCode());
        category.setName(request.getName());
        category.setDescription(request.getDescription());
        category.setLastUpdatedBy(principal.getName());

        return mapToDto(repository.save(category));
    }

    @Transactional
    public void deleteCategory(String id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Category not found");
        }
        repository.deleteById(id);
    }

    private CategoryResponseDto mapToDto(Category category) {
        CategoryResponseDto dto = new CategoryResponseDto();
        dto.setId(category.getId());
        dto.setCode(category.getCode());
        dto.setName(category.getName());
        dto.setDescription(category.getDescription());
        dto.setCreatedBy(category.getCreatedBy());
        dto.setCreatedAt(category.getCreatedAt());
        dto.setLastUpdatedBy(category.getLastUpdatedBy());
        dto.setLastUpdatedAt(category.getLastUpdatedAt());
        return dto;
    }
} 