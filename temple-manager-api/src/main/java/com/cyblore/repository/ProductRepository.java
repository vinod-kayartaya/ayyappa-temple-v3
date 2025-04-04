package com.cyblore.repository;

import com.cyblore.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, String> {
    boolean existsByCode(Integer code);
    boolean existsByCodeAndIdNot(Integer code, String id);
    Optional<Product> findByCode(Integer code);
} 