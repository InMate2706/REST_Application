package com.example.CRUD_Application_springboot.repository;

import com.example.CRUD_Application_springboot.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Role getRoleById(Long id);
}
