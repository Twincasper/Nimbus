package com.nimbus.backend.repository;

import com.nimbus.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
//    This extension inherits several utility methods from JpaRepository such as save, findById, findAll, delete, etc.
    Optional<User> findByUsername(String username);
    boolean existsByUsername(String username); // to check if a username already exists
}

