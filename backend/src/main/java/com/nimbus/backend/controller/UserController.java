package com.nimbus.backend.controller;

import com.nimbus.backend.dto.ChangePasswordDTO;
import com.nimbus.backend.dto.CreateUserDTO;
import com.nimbus.backend.dto.UpdateUserDTO;
import com.nimbus.backend.dto.UserResponseDTO;
import com.nimbus.backend.model.User;
import com.nimbus.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
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

    // New method to convert UpdateUserDTO to User entity
    private User convertToEntity(UpdateUserDTO dto) {
        User user = new User();
        user.setUsername(dto.getUsername());
        user.setPronouns(dto.getPronouns());
        user.setBio(dto.getBio());
        user.setProfilePicture(dto.getProfilePicture());
        return user;
    }

    @PostMapping
    public UserResponseDTO createUser(@RequestBody CreateUserDTO createUserDTO) {
        User user = userService.createUser(
                createUserDTO.getUsername(),
                createUserDTO.getPassword()
        );
        return convertToDTO(user);
    }

    @GetMapping
    public List<UserResponseDTO> getAllUsers() {
        return userService.getAllUsers().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public UserResponseDTO getUserById(@PathVariable Integer id) {
         User foundUser = userService.getUserById(id).orElseThrow(() -> new RuntimeException("User not found"));
         return convertToDTO(foundUser);
    }

    @PutMapping("/{id}")
    public UserResponseDTO updateUser(
            @PathVariable Integer id,
            @RequestBody UpdateUserDTO userDTO,
            HttpSession session
    ) {
        User updatedUser = userService.updateUser(id, userDTO);


        User sessionUser = (User) session.getAttribute("currentUser");
        if (sessionUser != null && sessionUser.getId().equals(updatedUser.getId())) {
            session.setAttribute("currentUser", updatedUser);
        }
        return convertToDTO(updatedUser);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Integer id) {
        userService.deleteUser(id);
    }

    @GetMapping("/check/{username}")
    public boolean checkUsernameExists(@PathVariable String username) {
        return userService.usernameExists(username);
    }

    @PostMapping("/{id}/change-password")
    public ResponseEntity<?> changePassword(
            @PathVariable Integer id,
            @RequestBody ChangePasswordDTO changePasswordDTO
    ) {
        try {
            if (!changePasswordDTO.newPassword().equals(changePasswordDTO.confirmPassword())) {
                throw new IllegalArgumentException("New passwords do not match");
            }

            userService.changePassword(id, changePasswordDTO.currentPassword(), changePasswordDTO.newPassword());
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
