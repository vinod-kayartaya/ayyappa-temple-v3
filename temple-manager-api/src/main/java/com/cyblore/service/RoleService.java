package com.cyblore.service;

import com.cyblore.dto.RoleRequestDto;
import com.cyblore.dto.RoleResponseDto;
import com.cyblore.entity.Role;
import com.cyblore.repository.RoleRepository;
import com.cyblore.exceptions.ResourceNotFoundException;
import com.cyblore.exceptions.ApplicationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RoleService {
    private final RoleRepository repository;

    public RoleService(RoleRepository repository) {
        this.repository = repository;
    }

    public List<RoleResponseDto> getAllRoles() {
        return repository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public RoleResponseDto getRole(Integer id) {
        return repository.findById(id)
                .map(this::mapToDto)
                .orElseThrow(() -> new ResourceNotFoundException("Role not found"));
    }

    @Transactional
    public RoleResponseDto createRole(RoleRequestDto request, Principal principal) {
        if (repository.existsByRole(request.getRole())) {
            throw new ApplicationException("Role already exists");
        }

        Role role = new Role();
        role.setRole(request.getRole());
        role.setCreatedBy(principal.getName());

        return mapToDto(repository.save(role));
    }

    @Transactional
    public RoleResponseDto updateRole(Integer id, RoleRequestDto request, Principal principal) {
        Role role = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Role not found"));

        if (repository.existsByRoleAndIdNot(request.getRole(), id)) {
            throw new ApplicationException("Role already exists");
        }

        role.setRole(request.getRole());
        return mapToDto(repository.save(role));
    }

    @Transactional
    public void deleteRole(Integer id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Role not found");
        }
        repository.deleteById(id);
    }

    private RoleResponseDto mapToDto(Role role) {
        RoleResponseDto dto = new RoleResponseDto();
        dto.setId(role.getId());
        dto.setRole(role.getRole());
        dto.setCreatedBy(role.getCreatedBy());
        dto.setCreatedAt(role.getCreatedAt());
        return dto;
    }
} 