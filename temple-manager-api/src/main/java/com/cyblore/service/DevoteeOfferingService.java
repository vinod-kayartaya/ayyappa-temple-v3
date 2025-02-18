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
    public DevoteeOffering createOffering(DevoteeOfferingRequestDto request, Principal principal) {
        DevoteeOffering offering = new DevoteeOffering();
        offering.setId(UUID.randomUUID().toString());
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

        return repository.save(offering);
    }

    public DevoteeOffering getOffering(String id) {
        return repository.findByIdWithItems(id)
                .orElseThrow(() -> new ResourceNotFoundException("Offering not found"));
    }

    @Transactional
    public void deleteOffering(String id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Offering not found");
        }
        repository.deleteById(id);
    }

    public List<DevoteeNameNakshtramDto> getDevoteeNamesByPhoneNumber(String phoneNumber) {
        return repository.findUniqueDevoteeNamesByPhoneNumber(phoneNumber);
    }

    public List<DevoteeOffering> getAllOfferings(LocalDate startDate, LocalDate endDate) {
        return repository.findAllWithItemsAndVazhipaduByDateRange(startDate, endDate);
    }
} 