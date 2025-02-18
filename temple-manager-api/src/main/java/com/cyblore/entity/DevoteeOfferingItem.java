package com.cyblore.entity;

import jakarta.persistence.*;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonBackReference;
import java.math.BigDecimal;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "devotee_offering_items")
@Data
public class DevoteeOfferingItem {
    @Id
    private String id;
    
    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "devotee_offering_id", nullable = false)
    private DevoteeOffering devoteeOffering;
    
    @Column(name = "devotee_mobile_number")
    private String devoteeMobileNumber;
    
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vazhipadu_id", nullable = false)
    private Vazhipadu vazhipadu;
    
    @Column(name = "devotee_name", nullable = false)
    private String devoteeName;
    
    @Column(name = "devotee_nakshtram")
    private String devoteeNakshtram;
    
    @Column(name = "deity_name")
    private String deityName;
    
    @Column(name = "nos", nullable = false)
    private Integer nos;
    
    @Column(name = "amount", nullable = false)
    private BigDecimal amount;
} 