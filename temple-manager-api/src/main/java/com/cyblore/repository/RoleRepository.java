package com.cyblore.repository;

import com.cyblore.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Integer> {
    boolean existsByRole(String role);
    boolean existsByRoleAndIdNot(String role, Integer id);
} 