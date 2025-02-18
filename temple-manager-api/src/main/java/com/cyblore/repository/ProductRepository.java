package com.cyblore.repository;

import com.cyblore.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, String> {
    boolean existsByCode(Integer code);
    boolean existsByCodeAndIdNot(Integer code, String id);
} 