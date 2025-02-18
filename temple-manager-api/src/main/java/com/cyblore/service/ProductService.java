package com.cyblore.service;

import com.cyblore.dto.ProductRequestDto;
import com.cyblore.dto.ProductResponseDto;
import com.cyblore.entity.Product;
import com.cyblore.entity.Supplier;
import com.cyblore.entity.Category;
import com.cyblore.repository.ProductRepository;
import com.cyblore.repository.SupplierRepository;
import com.cyblore.repository.CategoryRepository;
import com.cyblore.exceptions.ResourceNotFoundException;
import com.cyblore.exceptions.ApplicationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {
    private final ProductRepository repository;
    private final SupplierRepository supplierRepository;
    private final CategoryRepository categoryRepository;

    public ProductService(ProductRepository repository,
            SupplierRepository supplierRepository,
            CategoryRepository categoryRepository) {
        this.repository = repository;
        this.supplierRepository = supplierRepository;
        this.categoryRepository = categoryRepository;
    }

    public List<ProductResponseDto> getAllProducts() {
        return repository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public ProductResponseDto getProduct(String id) {
        return repository.findById(id)
                .map(this::mapToDto)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
    }

    @Transactional
    public ProductResponseDto createProduct(ProductRequestDto request, Principal principal) {
        if (repository.existsByCode(request.getCode())) {
            throw new ApplicationException("Product code already exists");
        }

        Product product = new Product();
        updateProductFromDto(product, request);
        product.setCreatedBy(principal.getName());

        return mapToDto(repository.save(product));
    }

    @Transactional
    public ProductResponseDto updateProduct(String id, ProductRequestDto request, Principal principal) {
        Product product = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        if (repository.existsByCodeAndIdNot(request.getCode(), id)) {
            throw new ApplicationException("Product code already exists");
        }

        updateProductFromDto(product, request);
        product.setLastUpdatedBy(principal.getName());

        return mapToDto(repository.save(product));
    }

    @Transactional
    public void deleteProduct(String id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Product not found");
        }
        repository.deleteById(id);
    }

    private void updateProductFromDto(Product product, ProductRequestDto dto) {
        product.setCode(dto.getCode());
        product.setName(dto.getName());
        product.setUnit(dto.getUnit());
        
        if (dto.getSupplierId() != null) {
            Supplier supplier = supplierRepository.findById(dto.getSupplierId())
                    .orElseThrow(() -> new ResourceNotFoundException("Supplier not found"));
            product.setSupplier(supplier);
        }
        
        if (dto.getCategoryId() != null) {
            Category category = categoryRepository.findById(dto.getCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
            product.setCategory(category);
        }
        
        product.setPrice(dto.getPrice());
        product.setCostPrice(dto.getCostPrice());
        product.setCommissionPercentage(dto.getCommissionPercentage());
        product.setTaxPercentage(dto.getTaxPercentage());
        product.setAstPercentage(dto.getAstPercentage());
        product.setOpeningStock(dto.getOpeningStock());
        product.setBlocked(dto.getBlocked());
    }

    private ProductResponseDto mapToDto(Product product) {
        ProductResponseDto dto = new ProductResponseDto();
        dto.setId(product.getId());
        dto.setCode(product.getCode());
        dto.setName(product.getName());
        dto.setUnit(product.getUnit());
        
        if (product.getSupplier() != null) {
            dto.setSupplierId(product.getSupplier().getId());
            dto.setSupplierName(product.getSupplier().getName());
        }
        
        if (product.getCategory() != null) {
            dto.setCategoryId(product.getCategory().getId());
            dto.setCategoryName(product.getCategory().getName());
        }
        
        dto.setPrice(product.getPrice());
        dto.setCostPrice(product.getCostPrice());
        dto.setCommissionPercentage(product.getCommissionPercentage());
        dto.setTaxPercentage(product.getTaxPercentage());
        dto.setAstPercentage(product.getAstPercentage());
        dto.setOpeningStock(product.getOpeningStock());
        dto.setIssued(product.getIssued());
        dto.setReceived(product.getReceived());
        dto.setDamaged(product.getDamaged());
        dto.setSalesReturned(product.getSalesReturned());
        dto.setPurchasesReturned(product.getPurchasesReturned());
        dto.setBlocked(product.getBlocked());
        dto.setQuantityInStock(product.getQuantityInStock());
        dto.setCreatedBy(product.getCreatedBy());
        dto.setCreatedAt(product.getCreatedAt());
        dto.setLastUpdatedBy(product.getLastUpdatedBy());
        dto.setLastUpdatedAt(product.getLastUpdatedAt());
        return dto;
    }
} 