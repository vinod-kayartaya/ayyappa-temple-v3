package com.cyblore.entity;

import jakarta.persistence.*;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "devotee_offerings")
@Data
public class DevoteeOffering {
    @Id
    private String id;
    
    @Column(name = "transaction_date", nullable = false)
    private LocalDate transactionDate;
    
    @Column(name = "offering_date", nullable = false)
    private LocalDate offeringDate;
    
    @Column(name = "created_by", nullable = false)
    private String createdBy;
    
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "last_updated_by")
    private String lastUpdatedBy;
    
    @Column(name = "last_updated_at")
    private LocalDateTime lastUpdatedAt;
    
    @JsonManagedReference
    @OneToMany(mappedBy = "devoteeOffering", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DevoteeOfferingItem> items = new ArrayList<>();
} 