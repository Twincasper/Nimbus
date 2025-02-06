package com.nimbus.backend.controller;

import com.nimbus.backend.dto.LoginRequestDTO;
import com.nimbus.backend.dto.RegisterRequestDTO;
import com.nimbus.backend.dto.UserResponseDTO;
import com.nimbus.backend.model.User;
import com.nimbus.backend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

// AuthController.java
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final BCryptPasswordEncoder passwordEncoder;

    public AuthController(UserService userService, BCryptPasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<UserResponseDTO> login(@RequestBody LoginRequestDTO request) {
        Optional<User> userOpt = userService.findByUsername(request.username());
        if (userOpt.isEmpty() || !passwordEncoder.matches(request.password(), userOpt.get().getPasswordHash())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials");
        }
        return ResponseEntity.ok(convertToDTO(userOpt.get()));
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponseDTO> register(@RequestBody RegisterRequestDTO request) {
        if (userService.usernameExists(request.username())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Username already exists");
        }

        User newUser = new User();
        newUser.setUsername(request.username());
        newUser.setPasswordHash(passwordEncoder.encode(request.password()));
        // Set extra fields
        newUser.setPronouns(request.pronouns());
        newUser.setProfilePicture(request.profilePicture());

        User savedUser = userService.save(newUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(convertToDTO(savedUser));
    }


    private UserResponseDTO convertToDTO(User user) {
        return new UserResponseDTO(
                user.getId(),
                user.getUsername(),
                user.getPronouns(),
                user.getBio(),
                user.getProfilePicture()
        );
    }
}



