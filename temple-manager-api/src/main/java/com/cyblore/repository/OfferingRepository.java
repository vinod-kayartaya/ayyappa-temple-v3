package com.cyblore.repository;

import com.cyblore.entity.DevoteeOffering;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface OfferingRepository extends JpaRepository<DevoteeOffering, Long> {
    
    @Query("SELECT do.offeringDate, doi.vazhipadu.vazhipaduName, COUNT(doi), SUM(doi.amount) " +
           "FROM DevoteeOffering do " +
           "JOIN do.items doi " +
           "WHERE do.offeringDate BETWEEN :fromDate AND :toDate " +
           "GROUP BY do.offeringDate, doi.vazhipadu.vazhipaduName " +
           "ORDER BY do.offeringDate ASC, doi.vazhipadu.vazhipaduName ASC")
    List<Object[]> findDailyRevenue(@Param("fromDate") LocalDate fromDate, 
                                   @Param("toDate") LocalDate toDate);

    @Query(value = "WITH monthly_data AS (" +
           "  SELECT DATE_FORMAT(do.offering_date, '%b-%y') as monthYear, " +
           "         MONTH(do.offering_date) as monthNum, " +
           "         v.vazhipadu_name, " +
           "         COUNT(doi.id) as count, " +
           "         SUM(doi.amount) as total " +
           "  FROM devotee_offerings do " +
           "  JOIN devotee_offering_items doi ON do.id = doi.devotee_offering_id " +
           "  JOIN vazhipadu v ON v.id = doi.vazhipadu_id " +
           "  WHERE YEAR(do.offering_date) = :year " +
           "  GROUP BY monthYear, monthNum, v.vazhipadu_name" +
           ") " +
           "SELECT monthYear, vazhipadu_name, count, total " +
           "FROM monthly_data " +
           "ORDER BY monthNum, vazhipadu_name", 
           nativeQuery = true)
    List<Object[]> findMonthlyRevenue(@Param("year") Integer year);

    @Query("SELECT do.createdBy, do.offeringDate, do.id, SUM(doi.amount) " +
           "FROM DevoteeOffering do " +
           "JOIN do.items doi " +
           "WHERE do.offeringDate BETWEEN :fromDate AND :toDate " +
           "GROUP BY do.createdBy, do.offeringDate, do.id " +
           "ORDER BY do.offeringDate ASC, do.createdBy ASC")
    List<Object[]> findUserwiseRevenue(@Param("fromDate") LocalDate fromDate, 
                                      @Param("toDate") LocalDate toDate);
} 