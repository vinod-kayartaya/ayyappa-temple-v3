package com.cyblore.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;

@Data
@NoArgsConstructor
@Entity
@Table(name = "users_roles")
public class UserRole {

    @EmbeddedId
    private UserRoleId id;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @MapsId("roleId")
    @JoinColumn(name = "role_id")
    private Role role;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_at")
    private Date createdAt;

    public UserRole(User user, Role role, String createdBy) {
        this.id = new UserRoleId(user.getId(), role.getId());
        this.user = user;
        this.role = role;
        this.createdBy = createdBy;
        this.createdAt = new Date();
    }

    @Embeddable
    @Data
    public static class UserRoleId implements Serializable {
        private Integer userId;
        private Integer roleId;

        public UserRoleId() {}

        public UserRoleId(Integer userId, Integer roleId) {
            this.userId = userId;
            this.roleId = roleId;
        }
    }
}