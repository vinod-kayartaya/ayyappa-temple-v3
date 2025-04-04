package com.cyblore.service;

import com.cyblore.dto.DevoteeOfferingRequestDto;
import com.cyblore.entity.DevoteeOffering;
import com.cyblore.entity.DevoteeOfferingItem;
import com.cyblore.entity.Vazhipadu;
import com.cyblore.repository.DevoteeOfferingRepository;
import com.cyblore.repository.VazhipaduRepository;
import com.cyblore.exceptions.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.UUID;
import java.security.Principal;
import java.util.List;
import com.cyblore.dto.DevoteeNameNakshtramDto;
import java.time.LocalDate;
import java.util.stream.Collectors;
import com.cyblore.dto.DevoteeOfferingResponseDto;
import java.math.BigDecimal;

@Service
public class DevoteeOfferingService {
    private final DevoteeOfferingRepository repository;
    private final VazhipaduRepository vazhipaduRepository;

    public DevoteeOfferingService(DevoteeOfferingRepository repository,
            VazhipaduRepository vazhipaduRepository) {
        this.repository = repository;
        this.vazhipaduRepository = vazhipaduRepository;
    }

    @Transactional
    public DevoteeOfferingResponseDto createOffering(DevoteeOfferingRequestDto request, Principal principal) {
        DevoteeOffering offering = new DevoteeOffering();
        offering.setTransactionDate(request.getTransactionDate());
        offering.setOfferingDate(request.getOfferingDate());
        offering.setCreatedBy(principal.getName());
        offering.setCreatedAt(LocalDateTime.now());

        request.getItems().forEach(item -> {
            DevoteeOfferingItem offeringItem = new DevoteeOfferingItem();
            offeringItem.setId(UUID.randomUUID().toString());
            offeringItem.setDevoteeOffering(offering);

            Vazhipadu vazhipadu = vazhipaduRepository.findById(item.getVazhipaduId())
                    .orElseThrow(() -> new ResourceNotFoundException("Vazhipadu not found"));

            offeringItem.setVazhipadu(vazhipadu);
            offeringItem.setDevoteeName(item.getDevoteeName());
            offeringItem.setDevoteeMobileNumber(item.getDevoteeMobileNumber());
            offeringItem.setDevoteeNakshtram(item.getDevoteeNakshtram());
            offeringItem.setDeityName(item.getDeityName());
            offeringItem.setNos(item.getNos());
            offeringItem.setAmount(item.getAmount());

            offering.getItems().add(offeringItem);
        });

        return mapToDto(repository.save(offering));
    }

    @Transactional
    public DevoteeOfferingResponseDto updateOffering(Long id, DevoteeOfferingRequestDto request, Principal principal) {
        DevoteeOffering offering = repository.findByIdWithItems(id)
                .orElseThrow(() -> new ResourceNotFoundException("Offering not found"));

        offering.setTransactionDate(request.getTransactionDate());
        offering.setOfferingDate(request.getOfferingDate());
        offering.setLastUpdatedBy(principal.getName());
        offering.setLastUpdatedAt(LocalDateTime.now());

        // Clear existing items
        offering.getItems().clear();

        // Add new items
        request.getItems().forEach(item -> {
            DevoteeOfferingItem offeringItem = new DevoteeOfferingItem();
            offeringItem.setId(UUID.randomUUID().toString());
            offeringItem.setDevoteeOffering(offering);

            Vazhipadu vazhipadu = vazhipaduRepository.findById(item.getVazhipaduId())
                    .orElseThrow(() -> new ResourceNotFoundException("Vazhipadu not found"));

            offeringItem.setVazhipadu(vazhipadu);
            offeringItem.setDevoteeName(item.getDevoteeName());
            offeringItem.setDevoteeMobileNumber(item.getDevoteeMobileNumber());
            offeringItem.setDevoteeNakshtram(item.getDevoteeNakshtram());
            offeringItem.setDeityName(item.getDeityName());
            offeringItem.setNos(item.getNos());
            offeringItem.setAmount(item.getAmount());

            offering.getItems().add(offeringItem);
        });

        return mapToDto(repository.save(offering));
    }

    public DevoteeOffering getOffering(Long id) {
        return repository.findByIdWithItems(id)
                .orElseThrow(() -> new ResourceNotFoundException("Offering not found"));
    }

    @Transactional
    public void deleteOffering(Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Offering not found");
        }
        repository.deleteById(id);
    }

    public List<DevoteeNameNakshtramDto> getDevoteeNamesByPhoneNumber(String phoneNumber) {
        return repository.findUniqueDevoteeNamesByPhoneNumber(phoneNumber);
    }

    public List<DevoteeOfferingResponseDto> getAllOfferings(LocalDate startDate, LocalDate endDate) {
        return repository.findAllWithItemsAndVazhipaduByDateRange(startDate, endDate)
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public List<DevoteeOfferingResponseDto> getDevoteeOfferings(LocalDateTime startDate, LocalDateTime endDate) {
        List<DevoteeOffering> offerings;
        if (startDate != null && endDate != null) {
            offerings = repository.findByDateRangeOrderByCreatedAtDesc(startDate, endDate);
        } else {
            offerings = repository.findAllByOrderByCreatedAtDesc();
        }
        return offerings.stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    private DevoteeOfferingResponseDto mapToDto(DevoteeOffering offering) {
        DevoteeOfferingResponseDto dto = new DevoteeOfferingResponseDto();
        dto.setId(offering.getId());
        dto.setBillNumber(String.format("%06d", offering.getId()));
        dto.setTransactionDate(offering.getTransactionDate());
        dto.setOfferingDate(offering.getOfferingDate());
        dto.setCreatedBy(offering.getCreatedBy());
        dto.setCreatedAt(offering.getCreatedAt());
        dto.setLastUpdatedBy(offering.getLastUpdatedBy());
        dto.setLastUpdatedAt(offering.getLastUpdatedAt());

        List<DevoteeOfferingResponseDto.DevoteeOfferingItemResponseDto> itemDtos = offering.getItems().stream()
                .map(item -> {
                    DevoteeOfferingResponseDto.DevoteeOfferingItemResponseDto itemDto = new DevoteeOfferingResponseDto.DevoteeOfferingItemResponseDto();
                    itemDto.setId(item.getId());
                    itemDto.setDevoteeMobileNumber(item.getDevoteeMobileNumber());
                    itemDto.setVazhipaduId(item.getVazhipadu().getId());
                    itemDto.setVazhipaduName(item.getVazhipadu().getVazhipaduName());
                    itemDto.setVazhipaduCode(item.getVazhipadu().getCode());
                    itemDto.setDevoteeName(item.getDevoteeName());
                    itemDto.setDevoteeNakshtram(item.getDevoteeNakshtram());
                    itemDto.setDeityName(item.getDeityName());
                    itemDto.setNos(item.getNos());
                    itemDto.setAmount(item.getAmount());
                    return itemDto;
                })
                .collect(Collectors.toList());

        dto.setItems(itemDtos);
        
        BigDecimal total = itemDtos.stream()
                .map(item -> item.getAmount().multiply(new BigDecimal(item.getNos())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        dto.setTotalAmount(total);

        return dto;
    }
}