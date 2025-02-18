package com.nimbus.backend.dto;

public record ChangePasswordDTO(
        String currentPassword,
        String newPassword,
        String confirmPassword
) {}
