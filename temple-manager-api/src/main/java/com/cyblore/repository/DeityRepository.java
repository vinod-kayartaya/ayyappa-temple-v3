package com.cyblore.repository;

import com.cyblore.entity.Deity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeityRepository extends JpaRepository<Deity, String> {
} 