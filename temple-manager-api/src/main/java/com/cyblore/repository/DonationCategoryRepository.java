package com.cyblore.repository;

import com.cyblore.entity.DonationCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DonationCategoryRepository extends JpaRepository<DonationCategory, String> {
    boolean existsByNameIgnoreCase(String name);
} 