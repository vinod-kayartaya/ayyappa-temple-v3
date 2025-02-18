package com.cyblore.repository;

import com.cyblore.entity.Vazhipadu;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VazhipaduRepository extends JpaRepository<Vazhipadu, String> {
    boolean existsByCode(Integer code);
    boolean existsByCodeAndIdNot(Integer code, String id);
    Optional<Vazhipadu> findByCode(Integer code);
} 