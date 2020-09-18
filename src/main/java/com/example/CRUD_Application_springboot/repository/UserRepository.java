package com.example.CRUD_Application_springboot.repository;

import com.example.CRUD_Application_springboot.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, Long> {
        @Query("SELECT u from User u join fetch u.roles where u.email =:email")
        User findByEmail(@Param("email") String email);
}
