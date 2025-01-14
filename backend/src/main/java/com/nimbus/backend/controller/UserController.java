package com.nimbus.backend.controller;

import com.nimbus.backend.dto.CreateUserDTO;
import com.nimbus.backend.dto.UserResponseDTO;
import com.nimbus.backend.model.User;
import com.nimbus.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")  // Add this to specify the base path
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    private UserResponseDTO convertToDTO(User user) {
        return new UserResponseDTO(user.getId(), user.getUsername());
    }

    private User convertToEntity(CreateUserDTO dto) {
        return new User(dto.getUsername(), dto.getPassword());
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
    public UserResponseDTO updateUser(@PathVariable Integer id, @RequestBody CreateUserDTO userDTO) {
        User updatingUser = userService.updateUser(id, convertToEntity(userDTO));
        return convertToDTO(updatingUser);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Integer id) {
        userService.deleteUser(id);
    }

    @GetMapping("/check/{username}")  // Fix path variable syntax
    public boolean checkUsernameExists(@PathVariable String username) {
        return userService.usernameExists(username);
    }
}
