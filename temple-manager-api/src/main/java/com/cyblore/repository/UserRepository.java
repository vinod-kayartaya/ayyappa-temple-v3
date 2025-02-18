package com.cyblore.repository;

import com.cyblore.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, Integer> {
    User findByUsername(String username);

    @Query("SELECT u FROM User u LEFT JOIN FETCH u.userRoles ur LEFT JOIN FETCH ur.role WHERE u.username = :username")
    User findByUsernameWithRoles(@Param("username") String username);

    User findByPrimaryEmail(String email);

    boolean existsByUsername(String username);
    boolean existsByUsernameAndIdNot(String username, Integer id);
    boolean existsByPrimaryEmail(String email);
    boolean existsByPrimaryEmailAndIdNot(String email, Integer id);
}