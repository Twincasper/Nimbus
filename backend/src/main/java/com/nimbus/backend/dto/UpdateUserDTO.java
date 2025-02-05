package com.nimbus.backend.dto;

import lombok.Data;

@Data
public class UpdateUserDTO {
    private String username;
    private String pronouns;
    private String bio;
    private String profilePicture;

    // Don't include password here unless you want to allow password updates separately
}