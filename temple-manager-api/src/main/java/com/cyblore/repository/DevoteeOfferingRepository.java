package com.cyblore.repository;

import com.cyblore.entity.DevoteeOffering;
import com.cyblore.dto.DevoteeNameNakshtramDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface DevoteeOfferingRepository extends JpaRepository<DevoteeOffering, String> {
    @Query("SELECT d FROM DevoteeOffering d LEFT JOIN FETCH d.items WHERE d.id = :id")
    Optional<DevoteeOffering> findByIdWithItems(String id);
    
    List<DevoteeOffering> findByOfferingDateBetween(LocalDate startDate, LocalDate endDate);

    @Query("SELECT DISTINCT new com.cyblore.dto.DevoteeNameNakshtramDto(i.devoteeName, i.devoteeNakshtram) FROM DevoteeOfferingItem i " +
           "WHERE i.devoteeMobileNumber = :phoneNumber " +
           "ORDER BY i.devoteeName, i.devoteeNakshtram")
    List<DevoteeNameNakshtramDto> findUniqueDevoteeNamesByPhoneNumber(String phoneNumber);

    @Query("SELECT DISTINCT d FROM DevoteeOffering d " +
           "LEFT JOIN FETCH d.items i " +
           "LEFT JOIN FETCH i.vazhipadu")
    List<DevoteeOffering> findAllWithItemsAndVazhipadu();

    @Query("SELECT DISTINCT d FROM DevoteeOffering d " +
           "LEFT JOIN FETCH d.items i " +
           "LEFT JOIN FETCH i.vazhipadu " +
           "WHERE d.transactionDate BETWEEN :startDate AND :endDate " +
           "ORDER BY d.transactionDate DESC")
    List<DevoteeOffering> findAllWithItemsAndVazhipaduByDateRange(
            @Param("startDate") LocalDate startDate, 
            @Param("endDate") LocalDate endDate);
} 