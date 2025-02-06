package com.nimbus.backend.dto;

public record RegisterRequestDTO(
        String username,
        String password,
        String pronouns,
        String profilePicture
) {}
