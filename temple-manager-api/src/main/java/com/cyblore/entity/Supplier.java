package com.cyblore.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.UUID;
import java.math.BigDecimal;

@Data
@Entity
@Table(name = "suppliers")
public class Supplier {
    @Id
    private String id;
    
    @Column(unique = true, nullable = false)
    private Integer code;
    
    @Column(nullable = false)
    private String name;
    
    @Column(name = "short_form")
    private String shortForm;
    
    private String type;
    private String address;
    private String phone;
    private String email;
    
    @Column(name = "reorder_level")
    private Integer reorderLevel;
    
    @Column(name = "margin_percentage")
    private BigDecimal marginPercentage;
    
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