package com.cyblore.repository;

import com.cyblore.entity.Sale;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface SaleRepository extends JpaRepository<Sale, String> {
    Page<Sale> findBySaleDateBetween(LocalDateTime startDate, LocalDateTime endDate, Pageable pageable);
    Page<Sale> findByCustomerNameContainingIgnoreCase(String customerName, Pageable pageable);
    Page<Sale> findByCustomerMobile(String customerMobile, Pageable pageable);
} 