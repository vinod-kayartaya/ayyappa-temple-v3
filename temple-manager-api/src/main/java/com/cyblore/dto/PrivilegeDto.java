package com.cyblore.dto;

import com.cyblore.entity.Privilege;
import lombok.Data;

import java.util.Date;

@Data
public class PrivilegeDto  implements Comparable<PrivilegeDto> {
    private Integer id;
    private String privilege;
    private String description;
    private Integer parentPrivilegeId;
    private Date createdAt;
    private String createdBy;

    // Convert from Entity to DTO
    public static PrivilegeDto fromEntity(Privilege privilege) {
        if(privilege == null) {
            return null;
        }
        PrivilegeDto privilegeDto = new PrivilegeDto();
        privilegeDto.setId(privilege.getId());
        privilegeDto.setPrivilege(privilege.getPrivilege());
        privilegeDto.setDescription(privilege.getDescription());
        privilegeDto.setParentPrivilegeId(privilege.getParentPrivilegeId());
        privilegeDto.setCreatedAt(privilege.getCreatedAt());
        privilegeDto.setCreatedBy(privilege.getCreatedBy());
        return privilegeDto;
    }

    // Convert from DTO to Entity
    public static Privilege toEntity(PrivilegeDto privilegeDto) {
        if(privilegeDto == null) {
            return null;
        }
        Privilege privilege = new Privilege();
        privilege.setId(privilegeDto.getId());
        privilege.setPrivilege(privilegeDto.getPrivilege());
        privilege.setDescription(privilegeDto.getDescription());
        privilege.setParentPrivilegeId(privilegeDto.getParentPrivilegeId());
        privilege.setCreatedAt(privilegeDto.getCreatedAt());
        privilege.setCreatedBy(privilegeDto.getCreatedBy());
        return privilege;
    }

    @Override
    public int compareTo(PrivilegeDto other) {
        return this.id.compareTo(other.id);
    }
}