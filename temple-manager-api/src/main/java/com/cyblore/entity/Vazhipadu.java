package com.cyblore.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.UUID;
import java.math.BigDecimal;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Data
@Entity
@Table(name = "vazhipadu")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Vazhipadu {
    @Id
    private String id;
    
    @Column(unique = true, nullable = false)
    private Integer code;
    
    @Column(name = "vazhipadu_name", nullable = false)
    private String vazhipaduName;
    
    @Column(nullable = false)
    private BigDecimal amount;
    
    @Column(name = "daily_count")
    private Integer dailyCount;
    
    @Column(name = "time_am_pm")
    private Integer timeAmPm;
    
    @Column(name = "times_per_day")
    private Integer timesPerDay;
    
    private Integer days;
    
    private Boolean blocking = false;
    
    private Boolean seasonal = false;
    
    @ManyToOne
    @JoinColumn(name = "offering_category_id")
    private OfferingCategory offeringCategory;
    
    private Boolean receipt = true;
    
    @Column(name = "booking_required")
    private Boolean bookingRequired = false;
    
    @ManyToOne
    @JoinColumn(name = "account_head_id")
    private User accountHead;
    
    @ManyToOne
    @JoinColumn(name = "account_sub_head_id")
    private User accountSubHead;
    
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