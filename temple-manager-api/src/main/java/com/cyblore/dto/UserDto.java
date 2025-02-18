package com.cyblore.dto;

import com.cyblore.entity.User;
import com.cyblore.entity.Role;
import com.cyblore.entity.Privilege;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class UserDto {
    private Integer id;
    private String username;
    private String firstname;
    private String lastname;
    private String designation;
    private String primaryEmail;
    private String primaryPhone;
    private String secondaryEmail;
    private String secondaryPhone;
    private byte[] photo;
    private LocalDateTime createdAt;
    private String createdBy;
    private Boolean isActive;
    private Boolean passwordChangeRequired;
    private LocalDateTime passwordLastChanged;
    private List<RoleDto> roles;
    private List<PrivilegeDto> privileges;

    public static UserDto fromEntity(User user) {
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setFirstname(user.getFirstname());
        dto.setLastname(user.getLastname());
        dto.setDesignation(user.getDesignation());
        dto.setPrimaryEmail(user.getPrimaryEmail());
        dto.setPrimaryPhone(user.getPrimaryPhone());
        dto.setSecondaryEmail(user.getSecondaryEmail());
        dto.setSecondaryPhone(user.getSecondaryPhone());
        dto.setPhoto(user.getPhoto());
        dto.setCreatedAt(user.getCreatedAt());
        dto.setCreatedBy(user.getCreatedBy());
        dto.setIsActive(user.getIsActive());
        dto.setPasswordChangeRequired(user.getPasswordChangeRequired());
        dto.setPasswordLastChanged(user.getPasswordLastChanged());

        dto.setRoles(user.getRoles().stream()
                .map(RoleDto::fromEntity)
                .collect(Collectors.toList()));

        dto.setPrivileges(user.getPrivileges().stream()
                .map(PrivilegeDto::fromEntity)
                .collect(Collectors.toList()));

        return dto;
    }

    public User toEntity() {
        User user = new User();
        user.setId(this.getId());
        user.setUsername(this.getUsername());
        user.setFirstname(this.getFirstname());
        user.setLastname(this.getLastname());
        user.setDesignation(this.getDesignation());
        user.setPrimaryEmail(this.getPrimaryEmail());
        user.setPrimaryPhone(this.getPrimaryPhone());
        user.setSecondaryEmail(this.getSecondaryEmail());
        user.setSecondaryPhone(this.getSecondaryPhone());
        user.setPhoto(this.getPhoto());
        user.setCreatedAt(this.getCreatedAt());
        user.setCreatedBy(this.getCreatedBy());
        user.setIsActive(this.getIsActive());
        user.setPasswordChangeRequired(this.getPasswordChangeRequired());
        user.setPasswordLastChanged(this.getPasswordLastChanged());
        // Note: Roles and privileges should be set separately to maintain proper relationships
        return user;
    }

}