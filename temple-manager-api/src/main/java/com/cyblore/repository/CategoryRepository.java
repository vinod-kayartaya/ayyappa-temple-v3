package com.cyblore.repository;

import com.cyblore.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, String> {
    boolean existsByCode(Integer code);
    boolean existsByCodeAndIdNot(Integer code, String id);
} 