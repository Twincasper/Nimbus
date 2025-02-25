package com.nimbus.backend.service.impl;

import com.nimbus.backend.dto.UpdateUserDTO;
import com.nimbus.backend.model.User;
import com.nimbus.backend.repository.UserRepository;
import com.nimbus.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    @Transactional
    @Override
    public User createUser(String username, String password) {
        if (userRepository.findByUsername(username).isPresent()) {
            throw new IllegalArgumentException("Username already exists");
        }

        User user = new User();
        user.setUsername(username);
        user.setPasswordHash(passwordEncoder.encode(password));
        user.setProfilePicture(generateDefaultAvatarUrl(username)); // Set default profile picture
        return userRepository.save(user);
    }

    public User save(User user) {
        return userRepository.save(user);
    }

    private String generateDefaultAvatarUrl(String username) {
        String initial = username.isEmpty() ? "?" : username.substring(0, 1).toUpperCase();
        return "https://api.dicebear.com/7.x/initials/svg?seed=" + initial + "&size=64&backgroundType=gradientLinear";
    }

    @Transactional(readOnly = true)
    @Override
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Transactional(readOnly = true)
    @Override
    public boolean usernameExists(String username) {
        return userRepository.findByUsername(username).isPresent();
    }

    @Transactional(readOnly = true)
    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Transactional(readOnly = true)
    @Override
    public Optional<User> getUserById(Integer id) {
        return userRepository.findById(id);
    }

    @Override
    public User updateUser(Integer id, UpdateUserDTO userDetails) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        // Update fields only if they're provided in the DTO
        if (userDetails.getUsername() != null) {
            user.setUsername(userDetails.getUsername());
        }

        user.setPronouns(userDetails.getPronouns()); // Optional field (can be null)
        user.setBio(userDetails.getBio());           // Optional field
        user.setProfilePicture(userDetails.getProfilePicture()); // Optional field

        return userRepository.save(user);
    }

    @Override
    @Transactional
    public void changePassword(Integer userId, String currentPassword, String newPassword) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        if (!passwordEncoder.matches(currentPassword, user.getPasswordHash())) {
            throw new IllegalArgumentException("Current password is incorrect");
        }

        if (!newPassword.matches("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$")) {
            throw new IllegalArgumentException("Password must be at least 8 characters with letters and numbers");
        }

        user.setPasswordHash(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    @Override
    public void deleteUser(Integer id) {
        userRepository.deleteById(id);
    }
}
