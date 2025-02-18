package com.cyblore.dto;

import com.cyblore.entity.Role;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class RoleDto {
    private Integer id;
    private String role;
    private String createdBy;
    private LocalDateTime createdAt;
    private List<PrivilegeDto> privileges;

    // Convert from Entity to DTO
    public static RoleDto fromEntity(Role role) {
        RoleDto dto = new RoleDto();
        dto.setId(role.getId());
        dto.setRole(role.getRole());
        dto.setCreatedBy(role.getCreatedBy());
        dto.setCreatedAt(role.getCreatedAt());

        if (role.getPrivileges() != null) {
            dto.setPrivileges(role.getPrivileges().stream()
                    .map(PrivilegeDto::fromEntity)
                    .collect(Collectors.toList()));
        }

        return dto;
    }

    // Convert from DTO to Entity
    public Role toEntity() {
        Role role = new Role();
        role.setId(this.getId());
        role.setRole(this.getRole());
        role.setCreatedBy(this.getCreatedBy());
        role.setCreatedAt(this.getCreatedAt());

        if (this.getPrivileges() != null) {
            role.setPrivileges(this.getPrivileges().stream()
                    .map(PrivilegeDto::toEntity)
                    .collect(Collectors.toList()));
        }

        return role;
    }
}