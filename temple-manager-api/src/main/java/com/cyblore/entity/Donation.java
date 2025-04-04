package com.cyblore.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.time.LocalDate;
import java.math.BigDecimal;
import java.util.UUID;

@Data
@Entity
@Table(name = "donations")
public class Donation {
    @Id
    private String id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "donation_category_id", nullable = false)
    private DonationCategory donationCategory;
    
    @Column(name = "devotee_name", nullable = false, length = 100)
    private String devoteeName;
    
    @Column(name = "devotee_phone", length = 20, nullable = true)
    private String devoteePhone;
    
    @Column(name = "devotee_email", length = 100, nullable = true)
    private String devoteeEmail;
    
    @Column(name = "devotee_address", nullable = true)
    private String devoteeAddress;
    
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal amount;
    
    @Column(name = "payment_mode", nullable = false, length = 20)
    private String paymentMode;
    
    @Column(name = "payment_reference", length = 100, nullable = true)
    private String paymentReference;
    
    @Column(name = "receipt_number", length = 50, nullable = true)
    private String receiptNumber;
    
    @Column(name = "donation_date", nullable = false)
    private LocalDate donationDate;
    
    @Column(nullable = true)
    private String remarks;
    
    @Column(name = "created_by", nullable = false)
    private String createdBy;
    
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "last_updated_by", nullable = true)
    private String lastUpdatedBy;
    
    @Column(name = "last_updated_at", nullable = true)
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