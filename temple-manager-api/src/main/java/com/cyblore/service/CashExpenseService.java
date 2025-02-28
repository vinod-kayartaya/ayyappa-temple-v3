package com.cyblore.service;

import com.cyblore.dto.CashExpenseRequestDto;
import com.cyblore.dto.CashExpenseResponseDto;
import com.cyblore.dto.ExpenseCategoryResponseDto;
import com.cyblore.dto.UserDto;
import com.cyblore.entity.CashExpense;
import com.cyblore.entity.ExpenseType;
import com.cyblore.entity.User;
import com.cyblore.entity.ExpenseCategory;
import com.cyblore.repository.CashExpenseRepository;
import com.cyblore.repository.UserRepository;
import com.cyblore.repository.ExpenseCategoryRepository;
import com.cyblore.exceptions.ResourceNotFoundException;
import com.cyblore.exceptions.ApplicationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.security.Principal;
import java.time.LocalDate;

@Service
public class CashExpenseService {
    private final CashExpenseRepository repository;
    private final UserRepository userRepository;
    private final ExpenseCategoryRepository categoryRepository;

    public CashExpenseService(
            CashExpenseRepository repository,
            UserRepository userRepository,
            ExpenseCategoryRepository categoryRepository) {
        this.repository = repository;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
    }

    public Page<CashExpenseResponseDto> getAllExpenses(ExpenseType expenseType, Pageable pageable) {
        if (expenseType != null) {
            return repository.findByExpenseTypeOrderByVoucherDateDesc(expenseType, pageable)
                    .map(this::mapToDto);
        }
        return repository.findAllByOrderByVoucherDateDesc(pageable)
                .map(this::mapToDto);
    }

    public Page<CashExpenseResponseDto> getExpensesByDateRange(
            LocalDate startDate,
            LocalDate endDate,
            ExpenseType expenseType,
            Pageable pageable) {
        if (expenseType != null) {
            return repository.findByVoucherDateBetweenAndExpenseTypeOrderByVoucherDateDesc(
                    startDate, endDate, expenseType, pageable)
                    .map(this::mapToDto);
        }
        return repository.findByVoucherDateBetweenOrderByVoucherDateDesc(startDate, endDate, pageable)
                .map(this::mapToDto);
    }

    public CashExpenseResponseDto getExpense(String id) {
        return repository.findById(id)
                .map(this::mapToDto)
                .orElseThrow(() -> new ResourceNotFoundException("Cash expense not found"));
    }

    @Transactional
    public CashExpenseResponseDto createExpense(CashExpenseRequestDto request, Principal principal) {
        // Validate required fields
        if (request.getPurpose() == null || request.getPurpose().trim().isEmpty()) {
            throw new ApplicationException("Purpose is required");
        }
        if (request.getVoucherNo() == null) {
            throw new ApplicationException("Voucher number is required");
        }
        if (request.getPaidTo() == null || request.getPaidTo().trim().isEmpty()) {
            throw new ApplicationException("Paid to is required");
        }
        if (request.getAmount() == null) {
            throw new ApplicationException("Amount is required");
        }
        if (request.getVoucherDate() == null) {
            throw new ApplicationException("Voucher date is required");
        }
        if (request.getExpenseType() == null) {
            throw new ApplicationException("Expense type is required");
        }

        if (repository.existsByVoucherNo(request.getVoucherNo())) {
            throw new ApplicationException("Voucher number already exists");
        }

        CashExpense expense = new CashExpense();
        updateExpenseFromRequest(expense, request);
        expense.setCreatedBy(principal.getName());

        return mapToDto(repository.save(expense));
    }

    @Transactional
    public CashExpenseResponseDto updateExpense(String id, CashExpenseRequestDto request, Principal principal) {
        if (repository.existsByVoucherNoAndIdNot(request.getVoucherNo(), id)) {
            throw new ApplicationException("Voucher number already exists");
        }

        CashExpense expense = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cash expense not found"));

        updateExpenseFromRequest(expense, request);
        expense.setLastUpdatedBy(principal.getName());

        return mapToDto(repository.save(expense));
    }

    @Transactional
    public void deleteExpense(String id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Cash expense not found");
        }
        repository.deleteById(id);
    }

    private void updateExpenseFromRequest(CashExpense expense, CashExpenseRequestDto request) {
        expense.setVoucherNo(request.getVoucherNo());
        expense.setVoucherDate(request.getVoucherDate());
        expense.setPaidTo(request.getPaidTo());
        expense.setAmount(request.getAmount());
        expense.setPurpose(request.getPurpose());
        expense.setExpenseType(request.getExpenseType());

        if (request.getApprovedById() == null) {
            expense.setApprovedBy(null);
        } else {
            User approver = userRepository.findById(Integer.valueOf(request.getApprovedById()))
                    .orElseThrow(() -> new ResourceNotFoundException("Approver not found"));
            expense.setApprovedBy(approver);
        }

        if (request.getCategoryId() == null) {
            expense.setCategory(categoryRepository.findByNameIgnoreCase("Others")
                    .orElseThrow(() -> new ApplicationException("Default category not found")));
        } else {
            ExpenseCategory category = categoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
            expense.setCategory(category);
        }
    }

    private CashExpenseResponseDto mapToDto(CashExpense expense) {
        CashExpenseResponseDto dto = new CashExpenseResponseDto();
        dto.setId(expense.getId());
        dto.setVoucherNo(expense.getVoucherNo());
        dto.setVoucherDate(expense.getVoucherDate());
        dto.setPaidTo(expense.getPaidTo());
        dto.setAmount(expense.getAmount());
        dto.setPurpose(expense.getPurpose());
        dto.setExpenseType(expense.getExpenseType());

        if (expense.getApprovedBy() != null) {
            UserDto approverDto = new UserDto();
            approverDto.setId(expense.getApprovedBy().getId());
            approverDto.setFirstname(expense.getApprovedBy().getFirstname());
            approverDto.setLastname(expense.getApprovedBy().getLastname());
            approverDto.setUsername(expense.getApprovedBy().getUsername());
            dto.setApprovedBy(approverDto);
        }

        if (expense.getCategory() != null) {
            ExpenseCategoryResponseDto categoryDto = new ExpenseCategoryResponseDto();
            categoryDto.setId(expense.getCategory().getId());
            categoryDto.setName(expense.getCategory().getName());
            categoryDto.setDescription(expense.getCategory().getDescription());
            dto.setCategory(categoryDto);
        }

        dto.setCreatedBy(expense.getCreatedBy());
        dto.setCreatedAt(expense.getCreatedAt());
        dto.setLastUpdatedBy(expense.getLastUpdatedBy());
        dto.setLastUpdatedAt(expense.getLastUpdatedAt());
        return dto;
    }
}