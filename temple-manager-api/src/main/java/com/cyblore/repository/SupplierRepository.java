package com.cyblore.repository;

import com.cyblore.entity.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SupplierRepository extends JpaRepository<Supplier, String> {
    boolean existsByCode(Integer code);
    boolean existsByCodeAndIdNot(Integer code, String id);
} 