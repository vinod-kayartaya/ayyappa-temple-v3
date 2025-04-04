package com.cyblore.service;

import com.cyblore.dto.VazhipaduRequestDto;
import com.cyblore.dto.VazhipaduResponseDto;
import com.cyblore.entity.Vazhipadu;
import com.cyblore.entity.OfferingCategory;
import com.cyblore.entity.User;
import com.cyblore.repository.VazhipaduRepository;
import com.cyblore.repository.OfferingCategoryRepository;
import com.cyblore.repository.UserRepository;
import com.cyblore.exceptions.ResourceNotFoundException;
import com.cyblore.exceptions.ApplicationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class VazhipaduService {
    private final VazhipaduRepository repository;
    private final OfferingCategoryRepository offeringCategoryRepository;
    private final UserRepository userRepository;

    public VazhipaduService(VazhipaduRepository repository,
            OfferingCategoryRepository offeringCategoryRepository,
            UserRepository userRepository) {
        this.repository = repository;
        this.offeringCategoryRepository = offeringCategoryRepository;
        this.userRepository = userRepository;
    }

    public List<VazhipaduResponseDto> getAllVazhipadus() {
        return repository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public VazhipaduResponseDto getVazhipadu(String id) {
        return repository.findById(id)
                .map(this::mapToDto)
                .orElseThrow(() -> new ResourceNotFoundException("Vazhipadu not found"));
    }

    @Transactional
    public VazhipaduResponseDto createVazhipadu(VazhipaduRequestDto request, Principal principal) {
        if (repository.existsByCode(request.getCode())) {
            throw new ApplicationException("Vazhipadu code already exists");
        }

        Vazhipadu vazhipadu = new Vazhipadu();
        updateVazhipaduFromDto(vazhipadu, request);
        vazhipadu.setCreatedBy(principal.getName());

        return mapToDto(repository.save(vazhipadu));
    }

    @Transactional
    public VazhipaduResponseDto updateVazhipadu(String id, VazhipaduRequestDto request, Principal principal) {
        Vazhipadu vazhipadu = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vazhipadu not found"));

        if (repository.existsByCodeAndIdNot(request.getCode(), id)) {
            throw new ApplicationException("Vazhipadu code already exists");
        }

        updateVazhipaduFromDto(vazhipadu, request);
        vazhipadu.setLastUpdatedBy(principal.getName());

        return mapToDto(repository.save(vazhipadu));
    }

    @Transactional
    public void deleteVazhipadu(String id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Vazhipadu not found");
        }
        repository.deleteById(id);
    }

    public VazhipaduResponseDto getVazhipaduByCode(Integer code) {
        return repository.findByCode(code)
                .map(this::mapToDto)
                .orElseThrow(() -> new ResourceNotFoundException("Vazhipadu not found with code: " + code));
    }

    private void updateVazhipaduFromDto(Vazhipadu vazhipadu, VazhipaduRequestDto dto) {
        vazhipadu.setCode(dto.getCode());
        vazhipadu.setVazhipaduName(dto.getVazhipaduName());
        vazhipadu.setAmount(dto.getAmount());
        vazhipadu.setDailyCount(dto.getDailyCount());
        vazhipadu.setTimeAmPm(dto.getTimeAmPm());
        vazhipadu.setTimesPerDay(dto.getTimesPerDay());
        vazhipadu.setDays(dto.getDays());
        vazhipadu.setBlocking(dto.getBlocking());
        vazhipadu.setSeasonal(dto.getSeasonal());
        vazhipadu.setReceipt(dto.getReceipt());
        vazhipadu.setBookingRequired(dto.getBookingRequired());
        
        if (dto.getOfferingCategoryId() != null) {
            OfferingCategory category = offeringCategoryRepository.findById(dto.getOfferingCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException("Offering category not found"));
            vazhipadu.setOfferingCategory(category);
        }
        
        if (dto.getAccountHeadId() != null && !dto.getAccountHeadId().trim().isEmpty()) {
            User accountHead = userRepository.findById(Integer.parseInt(dto.getAccountHeadId()))
                    .orElseThrow(() -> new ResourceNotFoundException("Account head not found"));
            vazhipadu.setAccountHead(accountHead);
        } else {
            vazhipadu.setAccountHead(null);
        }
        
        if (dto.getAccountSubHeadId() != null && !dto.getAccountSubHeadId().trim().isEmpty()) {
            User accountSubHead = userRepository.findById(Integer.parseInt(dto.getAccountSubHeadId()))
                    .orElseThrow(() -> new ResourceNotFoundException("Account sub head not found"));
            vazhipadu.setAccountSubHead(accountSubHead);
        } else {
            vazhipadu.setAccountSubHead(null);
        }
    }

    private VazhipaduResponseDto mapToDto(Vazhipadu vazhipadu) {
        VazhipaduResponseDto dto = new VazhipaduResponseDto();
        dto.setId(vazhipadu.getId());
        dto.setCode(vazhipadu.getCode());
        dto.setVazhipaduName(vazhipadu.getVazhipaduName());
        dto.setAmount(vazhipadu.getAmount());
        dto.setDailyCount(vazhipadu.getDailyCount());
        dto.setTimeAmPm(vazhipadu.getTimeAmPm());
        dto.setTimesPerDay(vazhipadu.getTimesPerDay());
        dto.setDays(vazhipadu.getDays());
        dto.setBlocking(vazhipadu.getBlocking());
        dto.setSeasonal(vazhipadu.getSeasonal());
        dto.setReceipt(vazhipadu.getReceipt());
        dto.setBookingRequired(vazhipadu.getBookingRequired());
        
        if (vazhipadu.getOfferingCategory() != null) {
            dto.setOfferingCategoryId(vazhipadu.getOfferingCategory().getId());
            dto.setOfferingCategoryName(vazhipadu.getOfferingCategory().getName());
        }
        
        if (vazhipadu.getAccountHead() != null) {
            dto.setAccountHeadId(vazhipadu.getAccountHead().getId().toString());
            dto.setAccountHeadName(vazhipadu.getAccountHead().getFirstname());
        }
        
        if (vazhipadu.getAccountSubHead() != null) {
            dto.setAccountSubHeadId(vazhipadu.getAccountSubHead().getId().toString());
            dto.setAccountSubHeadName(vazhipadu.getAccountSubHead().getFirstname());
        }
        
        dto.setCreatedBy(vazhipadu.getCreatedBy());
        dto.setCreatedAt(vazhipadu.getCreatedAt());
        dto.setLastUpdatedBy(vazhipadu.getLastUpdatedBy());
        dto.setLastUpdatedAt(vazhipadu.getLastUpdatedAt());
        return dto;
    }
} 