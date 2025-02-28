package com.cyblore.repository;

import com.cyblore.entity.CashExpense;
import com.cyblore.entity.ExpenseType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface CashExpenseRepository extends JpaRepository<CashExpense, String> {
    boolean existsByVoucherNo(Integer voucherNo);
    boolean existsByVoucherNoAndIdNot(Integer voucherNo, String id);
    Optional<CashExpense> findByVoucherNo(Integer voucherNo);
    
    Page<CashExpense> findByVoucherDateBetweenAndExpenseTypeOrderByVoucherDateDesc(
            LocalDate startDate, 
            LocalDate endDate,
            ExpenseType expenseType,
            Pageable pageable
    );
    
    Page<CashExpense> findByVoucherDateBetweenOrderByVoucherDateDesc(
            LocalDate startDate, 
            LocalDate endDate, 
            Pageable pageable
    );
    
    Page<CashExpense> findByExpenseTypeOrderByVoucherDateDesc(
            ExpenseType expenseType,
            Pageable pageable
    );
    
    Page<CashExpense> findAllByOrderByVoucherDateDesc(Pageable pageable);
} 