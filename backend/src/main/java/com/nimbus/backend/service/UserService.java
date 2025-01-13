package com.nimbus.backend.service;

import com.nimbus.backend.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    User createUser(String username, String password);
    Optional<User> findByUsername(String username);
    boolean usernameExists(String username);
}
