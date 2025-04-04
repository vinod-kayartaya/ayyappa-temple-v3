package com.cyblore.service;

import com.cyblore.dto.DonationRequestDto;
import com.cyblore.dto.DonationResponseDto;
import com.cyblore.entity.Donation;
import com.cyblore.entity.DonationCategory;
import com.cyblore.repository.DonationRepository;
import com.cyblore.repository.DonationCategoryRepository;
import com.cyblore.exceptions.ResourceNotFoundException;
import com.cyblore.exceptions.ApplicationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.security.Principal;
import java.time.LocalDate;

@Service
public class DonationService {
    private final DonationRepository repository;
    private final DonationCategoryRepository categoryRepository;

    public DonationService(DonationRepository repository, DonationCategoryRepository categoryRepository) {
        this.repository = repository;
        this.categoryRepository = categoryRepository;
    }

    public Page<DonationResponseDto> getAllDonations(Pageable pageable) {
        return repository.findAllByOrderByDonationDateDesc(pageable)
                .map(this::mapToDto);
    }

    public Page<DonationResponseDto> getDonationsByDateRange(
            LocalDate startDate,
            LocalDate endDate,
            Pageable pageable) {
        return repository.findByDonationDateBetweenOrderByDonationDateDesc(startDate, endDate, pageable)
                .map(this::mapToDto);
    }

    public DonationResponseDto getDonation(String id) {
        return repository.findById(id)
                .map(this::mapToDto)
                .orElseThrow(() -> new ResourceNotFoundException("Donation not found"));
    }

    @Transactional
    public DonationResponseDto createDonation(DonationRequestDto request, Principal principal) {
        Donation donation = new Donation();
        updateDonationFromRequest(donation, request);
        donation.setCreatedBy(principal.getName());
        
        // Generate receipt number
        int year = donation.getDonationDate().getYear();
        int sequenceNumber = getNextReceiptNumber(year);
        String receiptNumber = String.format("DON/%d/%05d", year, sequenceNumber);
        donation.setReceiptNumber(receiptNumber);

        return mapToDto(repository.save(donation));
    }

    @Transactional
    public DonationResponseDto updateDonation(String id, DonationRequestDto request, Principal principal) {
        Donation donation = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Donation not found"));

        // Store the original receipt number
        String originalReceiptNumber = donation.getReceiptNumber();
        
        updateDonationFromRequest(donation, request);
        donation.setLastUpdatedBy(principal.getName());
        
        // Restore the original receipt number as it shouldn't be changed
        donation.setReceiptNumber(originalReceiptNumber);

        return mapToDto(repository.save(donation));
    }

    @Transactional
    public void deleteDonation(String id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Donation not found");
        }
        repository.deleteById(id);
    }

    @Transactional
    protected int getNextReceiptNumber(int year) {
        try {
            Integer lastNumber = repository.getLastReceiptNumber(year);
            if (lastNumber == null) {
                repository.initializeReceiptSequence(year);
                return 1;
            } else {
                repository.incrementReceiptNumber(year);
                return lastNumber + 1;
            }
        } catch (Exception e) {
            // Handle the case where the table might not exist yet
            repository.initializeReceiptSequence(year);
            return 1;
        }
    }

    private void updateDonationFromRequest(Donation donation, DonationRequestDto request) {
        DonationCategory category = categoryRepository.findById(request.getDonationCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Donation category not found"));
        
        donation.setDonationCategory(category);
        donation.setDevoteeName(request.getDevoteeName());
        donation.setDevoteePhone(request.getDevoteePhone());
        donation.setDevoteeEmail(request.getDevoteeEmail());
        donation.setDevoteeAddress(request.getDevoteeAddress());
        donation.setAmount(request.getAmount());
        donation.setPaymentMode(request.getPaymentMode());
        donation.setPaymentReference(request.getPaymentReference());
        donation.setDonationDate(request.getDonationDate());
        donation.setRemarks(request.getRemarks());
    }

    private DonationResponseDto mapToDto(Donation donation) {
        DonationResponseDto dto = new DonationResponseDto();
        dto.setId(donation.getId());
        dto.setDonationCategoryId(donation.getDonationCategory().getId());
        dto.setDonationCategoryName(donation.getDonationCategory().getName());
        dto.setDevoteeName(donation.getDevoteeName());
        dto.setDevoteePhone(donation.getDevoteePhone());
        dto.setDevoteeEmail(donation.getDevoteeEmail());
        dto.setDevoteeAddress(donation.getDevoteeAddress());
        dto.setAmount(donation.getAmount());
        dto.setPaymentMode(donation.getPaymentMode());
        dto.setPaymentReference(donation.getPaymentReference());
        dto.setReceiptNumber(donation.getReceiptNumber());
        dto.setDonationDate(donation.getDonationDate());
        dto.setRemarks(donation.getRemarks());
        dto.setCreatedBy(donation.getCreatedBy());
        dto.setCreatedAt(donation.getCreatedAt());
        dto.setLastUpdatedBy(donation.getLastUpdatedBy());
        dto.setLastUpdatedAt(donation.getLastUpdatedAt());
        return dto;
    }
} 