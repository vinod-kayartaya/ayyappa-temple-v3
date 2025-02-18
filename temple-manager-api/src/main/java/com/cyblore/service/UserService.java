package com.cyblore.service;

import com.cyblore.dto.UserRequestDto;
import com.cyblore.dto.UserResponseDto;
import com.cyblore.entity.User;
import com.cyblore.entity.Role;
import com.cyblore.repository.UserRepository;
import com.cyblore.repository.RoleRepository;
import com.cyblore.exceptions.ResourceNotFoundException;
import com.cyblore.exceptions.ApplicationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {
    private final UserRepository repository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository repository, 
            RoleRepository roleRepository,
            PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<UserResponseDto> getAllUsers() {
        return repository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public UserResponseDto getUser(Integer id) {
        return repository.findById(id)
                .map(this::mapToDto)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    @Transactional
    public UserResponseDto createUser(UserRequestDto request, Principal principal) {
        validateNewUser(request);

        User user = new User();
        updateUserFromDto(user, request);
        if (request.getPassword() != null && !request.getPassword().trim().isEmpty()) {
            user.setPassword(passwordEncoder.encode(request.getPassword()));
            user.setPasswordChangeRequired(false);
            user.setIsActive(request.getIsActive() != null ? request.getIsActive() : true);
        } else {
            // Generate a random temporary password if none provided
            String tempPassword = generateTemporaryPassword();
            user.setPassword(passwordEncoder.encode(tempPassword));
            user.setPasswordChangeRequired(true);
            user.setIsActive(false);
        }
        
        user.setCreatedBy(principal.getName());

        if (request.getRoles() != null) {
            for (Integer roleId : request.getRoles()) {
                Role role = roleRepository.findById(roleId)
                        .orElseThrow(() -> new ResourceNotFoundException("Role not found: " + roleId));
                user.addRole(role, principal.getName());
            }
        }

        return mapToDto(repository.save(user));
    }

    @Transactional
    public UserResponseDto updateUser(Integer id, UserRequestDto request, Principal principal) {
        User user = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        validateUpdateUser(request, id);
        updateUserFromDto(user, request);

        // Save basic user info first
        user = repository.save(user);
        
        // Handle roles update
        if (request.getRoles() != null && !request.getRoles().isEmpty()) {
            // Remove old roles
            user.getUserRoles().clear();
            repository.flush();
            
            // Add new roles
            for (Integer roleId : request.getRoles()) {
                Role role = roleRepository.findById(roleId)
                        .orElseThrow(() -> new ResourceNotFoundException("Role not found: " + roleId));
                user.addRole(role, principal.getName());
            }
            user = repository.save(user);
        }

        return mapToDto(user);
    }

    @Transactional
    public void deleteUser(Integer id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("User not found");
        }
        repository.deleteById(id);
    }

    private void validateNewUser(UserRequestDto request) {
        if (repository.existsByUsername(request.getUsername())) {
            throw new ApplicationException("Username already exists");
        }
        if (request.getPrimaryEmail() != null && 
                repository.existsByPrimaryEmail(request.getPrimaryEmail())) {
            throw new ApplicationException("Email already exists");
        }
    }

    private void validateUpdateUser(UserRequestDto request, Integer id) {
        if (repository.existsByUsernameAndIdNot(request.getUsername(), id)) {
            throw new ApplicationException("Username already exists");
        }
        if (request.getPrimaryEmail() != null && 
                repository.existsByPrimaryEmailAndIdNot(request.getPrimaryEmail(), id)) {
            throw new ApplicationException("Email already exists");
        }
    }

    private void updateUserFromDto(User user, UserRequestDto dto) {
        user.setUsername(dto.getUsername());
        user.setFirstname(dto.getFirstname());
        user.setLastname(dto.getLastname());
        user.setPrimaryEmail(dto.getPrimaryEmail());
        user.setPrimaryPhone(dto.getPrimaryPhone());
        user.setSecondaryEmail(dto.getSecondaryEmail());
        user.setSecondaryPhone(dto.getSecondaryPhone());
        user.setDesignation(dto.getDesignation());
        user.setIsActive(dto.getIsActive());
    }

    private UserResponseDto mapToDto(User user) {
        UserResponseDto dto = new UserResponseDto();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setFirstname(user.getFirstname());
        dto.setLastname(user.getLastname());
        dto.setPrimaryEmail(user.getPrimaryEmail());
        dto.setPrimaryPhone(user.getPrimaryPhone());
        dto.setSecondaryEmail(user.getSecondaryEmail());
        dto.setSecondaryPhone(user.getSecondaryPhone());
        dto.setDesignation(user.getDesignation());
        dto.setIsActive(user.getIsActive());
        dto.setPasswordChangeRequired(user.getPasswordChangeRequired());
        dto.setPasswordLastChanged(user.getPasswordLastChanged());
        dto.setCreatedBy(user.getCreatedBy());
        dto.setCreatedAt(user.getCreatedAt());

        dto.setRoles(user.getRoles().stream()
                .map(role -> {
                    UserResponseDto.RoleDto roleDto = new UserResponseDto.RoleDto();
                    roleDto.setId(role.getId());
                    roleDto.setRole(role.getRole());
                    return roleDto;
                })
                .collect(Collectors.toList()));

        return dto;
    }

    private String generateTemporaryPassword() {
        // Generate a random 12-character password
        return "Temp#" + System.currentTimeMillis() % 100000000;
    }
} 