package com.cyblore.service.impl;

import com.cyblore.dto.SaleItemRequestDto;
import com.cyblore.dto.SaleItemResponseDto;
import com.cyblore.dto.SaleRequestDto;
import com.cyblore.dto.SaleResponseDto;
import com.cyblore.entity.Product;
import com.cyblore.entity.Sale;
import com.cyblore.entity.SaleItem;
import com.cyblore.exceptions.ApplicationException;
import com.cyblore.exceptions.ResourceNotFoundException;
import com.cyblore.repository.ProductRepository;
import com.cyblore.repository.SaleRepository;
import com.cyblore.service.SaleService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;

import java.math.BigDecimal;
import java.security.Principal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import java.time.LocalDate;

@Service
public class SaleServiceImpl implements SaleService {

    private final SaleRepository saleRepository;
    private final ProductRepository productRepository;
    private final EntityManager entityManager;

    public SaleServiceImpl(SaleRepository saleRepository, ProductRepository productRepository, EntityManager entityManager) {
        this.saleRepository = saleRepository;
        this.productRepository = productRepository;
        this.entityManager = entityManager;
    }

    @Override
    @Transactional
    public SaleResponseDto createSale(SaleRequestDto saleRequestDto, Principal principal) {
        if (saleRequestDto.getItems() == null || saleRequestDto.getItems().isEmpty()) {
            throw new ApplicationException("At least one product must be included in the sale");
        }

        Sale sale = new Sale();
        sale.setCustomerName(saleRequestDto.getCustomerName());
        sale.setCustomerMobile(saleRequestDto.getCustomerMobile());
        sale.setSaleDate(saleRequestDto.getSaleDate() != null ? saleRequestDto.getSaleDate() : LocalDateTime.now());
        sale.setCreatedBy(principal.getName());
        
        // Initialize total amount
        BigDecimal totalAmount = BigDecimal.ZERO;
        
        // Process all items
        for (SaleItemRequestDto itemDto : saleRequestDto.getItems()) {
            Product product = productRepository.findById(itemDto.getProductId())
                    .orElseThrow(() -> new ResourceNotFoundException("Product not found with ID: " + itemDto.getProductId()));
            
            // Determine unit price (use product price if not provided)
            BigDecimal unitPrice = (itemDto.getUnitPrice() != null) ? 
                    itemDto.getUnitPrice() : product.getPrice();
            
            // Calculate total price for this item
            BigDecimal itemTotal = unitPrice.multiply(BigDecimal.valueOf(itemDto.getQuantity()));
            
            // Create sale item
            SaleItem saleItem = new SaleItem();
            saleItem.setProduct(product);
            saleItem.setQuantity(itemDto.getQuantity());
            saleItem.setUnitPrice(unitPrice);
            saleItem.setTotalPrice(itemTotal);
            
            // Add item to sale
            sale.addItem(saleItem);
            
            // Add to sale total
            totalAmount = totalAmount.add(itemTotal);
            
            // Update product stock
            product.setQuantityInStock(product.getQuantityInStock() - itemDto.getQuantity());
            productRepository.save(product);
        }
        
        sale.setTotalAmount(totalAmount);
        
        // Generate bill number before saving
        sale.setBillNumber(generateBillNumber());
        
        Sale savedSale = saleRepository.save(sale);
        
        return mapToDto(savedSale);
    }

    @Override
    public SaleResponseDto getSale(String id) {
        Sale sale = saleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Sale not found with ID: " + id));
        
        return mapToDto(sale);
    }

    @Override
    public Page<SaleResponseDto> getAllSales(Pageable pageable) {
        return saleRepository.findAll(pageable).map(this::mapToDto);
    }

    @Override
    public Page<SaleResponseDto> getSalesByDateRange(LocalDateTime startDate, LocalDateTime endDate, Pageable pageable) {
        return saleRepository.findBySaleDateBetween(startDate, endDate, pageable).map(this::mapToDto);
    }

    @Override
    public Page<SaleResponseDto> getSalesByCustomerName(String customerName, Pageable pageable) {
        return saleRepository.findByCustomerNameContainingIgnoreCase(customerName, pageable).map(this::mapToDto);
    }

    @Override
    public Page<SaleResponseDto> getSalesByCustomerMobile(String customerMobile, Pageable pageable) {
        return saleRepository.findByCustomerMobile(customerMobile, pageable).map(this::mapToDto);
    }

    @Override
    @Transactional
    public SaleResponseDto updateSale(String id, SaleRequestDto saleRequestDto, Principal principal) {
        Sale existingSale = saleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Sale not found with ID: " + id));
        
        if (saleRequestDto.getItems() == null || saleRequestDto.getItems().isEmpty()) {
            throw new ApplicationException("At least one product must be included in the sale");
        }
        
        // Update basic info
        existingSale.setCustomerName(saleRequestDto.getCustomerName());
        existingSale.setCustomerMobile(saleRequestDto.getCustomerMobile());
        existingSale.setSaleDate(saleRequestDto.getSaleDate() != null ? saleRequestDto.getSaleDate() : existingSale.getSaleDate());
        existingSale.setLastUpdatedBy(principal.getName());
        
        // Return items to inventory
        for (SaleItem item : existingSale.getItems()) {
            Product product = item.getProduct();
            product.setQuantityInStock(product.getQuantityInStock() + item.getQuantity());
            productRepository.save(product);
        }
        
        // Clear existing items
        existingSale.getItems().clear();
        
        // Initialize total amount
        BigDecimal totalAmount = BigDecimal.ZERO;
        
        // Process all new items
        for (SaleItemRequestDto itemDto : saleRequestDto.getItems()) {
            Product product = productRepository.findById(itemDto.getProductId())
                    .orElseThrow(() -> new ResourceNotFoundException("Product not found with ID: " + itemDto.getProductId()));
            
            // Determine unit price
            BigDecimal unitPrice = (itemDto.getUnitPrice() != null) ? 
                    itemDto.getUnitPrice() : product.getPrice();
            
            // Calculate total price for this item
            BigDecimal itemTotal = unitPrice.multiply(BigDecimal.valueOf(itemDto.getQuantity()));
            
            // Create sale item
            SaleItem saleItem = new SaleItem();
            saleItem.setProduct(product);
            saleItem.setQuantity(itemDto.getQuantity());
            saleItem.setUnitPrice(unitPrice);
            saleItem.setTotalPrice(itemTotal);
            
            // Add item to sale
            existingSale.addItem(saleItem);
            
            // Add to sale total
            totalAmount = totalAmount.add(itemTotal);
            
            // Update product stock
            product.setQuantityInStock(product.getQuantityInStock() - itemDto.getQuantity());
            productRepository.save(product);
        }
        
        existingSale.setTotalAmount(totalAmount);
        Sale updatedSale = saleRepository.save(existingSale);
        
        return mapToDto(updatedSale);
    }

    @Override
    @Transactional
    public void deleteSale(String id) {
        Sale sale = saleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Sale not found with ID: " + id));
        
        // Return items to inventory
        for (SaleItem item : sale.getItems()) {
            Product product = item.getProduct();
            product.setQuantityInStock(product.getQuantityInStock() + item.getQuantity());
            productRepository.save(product);
        }
        
        saleRepository.delete(sale);
    }
    
    private SaleResponseDto mapToDto(Sale sale) {
        SaleResponseDto dto = new SaleResponseDto();
        dto.setId(sale.getId());
        dto.setCustomerName(sale.getCustomerName());
        dto.setCustomerMobile(sale.getCustomerMobile());
        dto.setSaleDate(sale.getSaleDate());
        dto.setTotalAmount(sale.getTotalAmount());
        dto.setBillNumber(sale.getBillNumber());
        dto.setCreatedBy(sale.getCreatedBy());
        dto.setCreatedAt(sale.getCreatedAt());
        
        List<SaleItemResponseDto> itemDtos = sale.getItems().stream()
                .map(this::mapToItemDto)
                .collect(Collectors.toList());
        
        dto.setItems(itemDtos);
        return dto;
    }
    
    private SaleItemResponseDto mapToItemDto(SaleItem item) {
        SaleItemResponseDto dto = new SaleItemResponseDto();
        dto.setId(item.getId());
        dto.setProductId(item.getProduct().getId());
        dto.setProductCode(item.getProduct().getCode());
        dto.setProductName(item.getProduct().getName());
        dto.setQuantity(item.getQuantity());
        dto.setUnitPrice(item.getUnitPrice());
        dto.setTotalPrice(item.getTotalPrice());
        return dto;
    }

    @Transactional
    public String generateBillNumber() {
        // Insert a new record to get the next sequence
        Query query = entityManager.createNativeQuery(
            "INSERT INTO bill_sequence (last_used) VALUES (NOW())");
        query.executeUpdate();
        
        // Get the last inserted ID
        Query seqQuery = entityManager.createNativeQuery(
            "SELECT LAST_INSERT_ID()");
        Integer sequence = ((Number) seqQuery.getSingleResult()).intValue();
        
        return String.format("%05d", sequence);
    }
} 