package com.cyblore.repository;

import com.cyblore.entity.Donation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;

@Repository
public interface DonationRepository extends JpaRepository<Donation, String> {
    Page<Donation> findByDonationDateBetweenOrderByDonationDateDesc(LocalDate startDate, LocalDate endDate, Pageable pageable);
    Page<Donation> findAllByOrderByDonationDateDesc(Pageable pageable);
    
    @Query(value = "SELECT last_number FROM receipt_number_sequence WHERE year = :year", nativeQuery = true)
    Integer getLastReceiptNumber(@Param("year") int year);
    
    @Modifying
    @Query(value = "INSERT INTO receipt_number_sequence (year, last_number) VALUES (:year, 1)", nativeQuery = true)
    void initializeReceiptSequence(@Param("year") int year);
    
    @Modifying
    @Query(value = "UPDATE receipt_number_sequence SET last_number = last_number + 1 WHERE year = :year", nativeQuery = true)
    void incrementReceiptNumber(@Param("year") int year);
} 