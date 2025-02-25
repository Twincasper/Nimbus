package com.nimbus.backend.service;

import com.nimbus.backend.dto.UpdateUserDTO;
import com.nimbus.backend.model.User;
import java.util.List;
import java.util.Optional;

public interface UserService {
    User createUser(String username, String password);
    User save(User user);


    List<User> getAllUsers();
    Optional<User> getUserById(Integer id);
    Optional<User> findByUsername(String username);
    boolean usernameExists(String username);

    User updateUser(Integer id, UpdateUserDTO userDetails);

    void changePassword(Integer userId, String currentPassword, String newPassword);

    void deleteUser(Integer id);
}