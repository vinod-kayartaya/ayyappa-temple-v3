package com.cyblore.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;

import java.util.Date;

@Data
@Entity
@Table(name="privileges")
@ToString
public class Privilege implements Comparable<Privilege> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String privilege;
    private String description;
    @Column(name="parent_privilege_id")
    private Integer parentPrivilegeId;
    @Column(name="created_at")
    private Date createdAt;
    @Column(name="created_by")
    private String createdBy;


    @Override
    public int compareTo(Privilege other) {
        return this.id.compareTo(other.id);
    }
}