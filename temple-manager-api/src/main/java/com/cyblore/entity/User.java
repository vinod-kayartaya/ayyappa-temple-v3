package com.cyblore.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "users")
@ToString(exclude = "userRoles")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    private String username;
    
    @Column(name = "firstname", nullable = false)
    private String firstname;
    
    @Column(name = "lastname")
    private String lastname;
    
    @Column(name = "primary_email")
    private String primaryEmail;
    
    @Column(name = "primary_phone")
    private String primaryPhone;
    
    @Column(name = "secondary_email")
    private String secondaryEmail;
    
    @Column(name = "secondary_phone")
    private String secondaryPhone;
    
    private String password;
    
    @Lob
    private byte[] photo;
    
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "created_by")
    private String createdBy;
    
    @Column(name = "is_active")
    private Boolean isActive = true;
    
    @Column(name = "password_change_required")
    private Boolean passwordChangeRequired = true;
    
    @Column(name = "password_last_changed")
    private LocalDateTime passwordLastChanged;
    
    private String designation;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserRole> userRoles = new ArrayList<>();

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    @Transient
    public List<Role> getRoles() {
        return userRoles.stream().map(UserRole::getRole).toList();
    }

    public void addRole(Role role, String createdBy) {
        UserRole userRole = new UserRole(this, role, createdBy);
        userRoles.add(userRole);
    }

    public void removeRole(Role role) {
        userRoles.removeIf(userRole -> userRole.getRole().equals(role));
    }

    @Transient
    public List<Privilege> getPrivileges() {
        return getRoles().stream()
                .flatMap(role -> role.getPrivileges().stream())
                .distinct()
                .toList();
    }
}