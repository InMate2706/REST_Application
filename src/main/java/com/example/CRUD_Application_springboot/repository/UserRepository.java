package com.example.CRUD_Application_springboot.repository;

import com.example.CRUD_Application_springboot.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
        User findByEmail(String email);
}
