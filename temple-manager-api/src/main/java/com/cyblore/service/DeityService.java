package com.cyblore.service;

import com.cyblore.dto.DeityRequestDto;
import com.cyblore.dto.DeityResponseDto;
import com.cyblore.entity.Deity;
import com.cyblore.repository.DeityRepository;
import com.cyblore.exceptions.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DeityService {
    private final DeityRepository repository;

    public DeityService(DeityRepository repository) {
        this.repository = repository;
    }

    public List<DeityResponseDto> getAllDeities() {
        return repository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public DeityResponseDto getDeity(String id) {
        return repository.findById(id)
                .map(this::mapToDto)
                .orElseThrow(() -> new ResourceNotFoundException("Deity not found"));
    }

    @Transactional
    public DeityResponseDto createDeity(DeityRequestDto request, Principal principal) {
        Deity deity = new Deity();
        deity.setName(request.getName());
        deity.setCreatedBy(principal.getName());

        return mapToDto(repository.save(deity));
    }

    @Transactional
    public DeityResponseDto updateDeity(String id, DeityRequestDto request) {
        Deity deity = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Deity not found"));

        deity.setName(request.getName());
        return mapToDto(repository.save(deity));
    }

    @Transactional
    public void deleteDeity(String id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Deity not found");
        }
        repository.deleteById(id);
    }

    private DeityResponseDto mapToDto(Deity deity) {
        DeityResponseDto dto = new DeityResponseDto();
        dto.setId(deity.getId());
        dto.setName(deity.getName());
        dto.setCreatedBy(deity.getCreatedBy());
        dto.setCreatedAt(deity.getCreatedAt());
        return dto;
    }
} 