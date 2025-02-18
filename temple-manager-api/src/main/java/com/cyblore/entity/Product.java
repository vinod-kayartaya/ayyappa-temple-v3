package com.cyblore.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.UUID;
import java.math.BigDecimal;

@Data
@Entity
@Table(name = "products")
public class Product {
    @Id
    private String id;
    
    @Column(unique = true, nullable = false)
    private Integer code;
    
    @Column(nullable = false)
    private String name;
    
    private String unit;
    
    @ManyToOne
    @JoinColumn(name = "supplier_id")
    private Supplier supplier;
    
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
    
    @Column(nullable = false)
    private BigDecimal price;
    
    @Column(name = "cost_price", nullable = false)
    private BigDecimal costPrice;
    
    @Column(name = "commission_percentage")
    private BigDecimal commissionPercentage;
    
    @Column(name = "tax_percentage")
    private BigDecimal taxPercentage;
    
    @Column(name = "ast_percentage")
    private BigDecimal astPercentage;
    
    @Column(name = "opening_stock")
    private Integer openingStock = 0;
    
    private Integer issued = 0;
    private Integer received = 0;
    private Integer damaged = 0;
    
    @Column(name = "sales_returned")
    private Integer salesReturned = 0;
    
    @Column(name = "purchases_returned")
    private Integer purchasesReturned = 0;
    
    private Integer blocked = 0;
    
    @Column(name = "quantity_in_stock")
    private Integer quantityInStock = 0;
    
    @Column(name = "created_by", nullable = false)
    private String createdBy;
    
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "last_updated_by")
    private String lastUpdatedBy;
    
    @Column(name = "last_updated_at")
    private LocalDateTime lastUpdatedAt;

    @PrePersist
    protected void onCreate() {
        id = UUID.randomUUID().toString();
        createdAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        lastUpdatedAt = LocalDateTime.now();
    }
} 