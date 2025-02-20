package com.base.SpringSecurityInitialConfig.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Set;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "users")
public class UserEntity implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true, nullable = false) @NotBlank
    @Pattern(
            regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
            message = "{invalid.email}"
    )
    /**
     * this email pattern validate that:
     * there must be a 'username' before @ which can it contain special chars.
     * domain cant have special chars.
     * cant nest points
     * upper level domain has 2 minimum chars
     * */
    private String email;
    @NotBlank @Column(unique = true)
    private String username;
    @NotBlank
    private String password;

    @ManyToMany(fetch = FetchType.EAGER, targetEntity = RoleEntity.class, cascade = CascadeType.PERSIST)
    /**
     * Cascade type is set to PERSIST because deleting a role doesn't make sense,
     * as it could be used by another user in the future.
     * Intermediate table between UserEntity and RoleEntity, modeling a unidirectional relationship.
     * - A user can have one or more roles.
     * - A role can be associated with one or more users, but roles only store user IDs.
     */
    @JoinTable(name= "user_roles", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<RoleEntity> roles;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles.stream().map(r -> new SimpleGrantedAuthority(r.getNombre().name())).toList();
    }

    // default value of all these methods is true
    @Override
    public boolean isAccountNonExpired() {
        return UserDetails.super.isAccountNonExpired();
    }

    @Override
    public boolean isAccountNonLocked() {
        return UserDetails.super.isAccountNonLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return UserDetails.super.isCredentialsNonExpired();
    }

    @Override
    public boolean isEnabled() {
        return UserDetails.super.isEnabled();
    }
}
