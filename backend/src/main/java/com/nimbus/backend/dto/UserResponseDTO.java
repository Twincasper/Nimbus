package com.nimbus.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserResponseDTO {
    private Integer id;
    private String username;
    private String pronouns;
    private String bio;
    private String profilePicture;

    // No-args constructor (if not using Lombok's @NoArgsConstructor)
    public UserResponseDTO() {}
}