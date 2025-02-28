package com.cyblore.repository;

import com.cyblore.entity.ExpenseCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ExpenseCategoryRepository extends JpaRepository<ExpenseCategory, String> {
    boolean existsByNameIgnoreCase(String name);
    boolean existsByNameIgnoreCaseAndIdNot(String name, String id);
    Optional<ExpenseCategory> findByNameIgnoreCase(String name);
} 