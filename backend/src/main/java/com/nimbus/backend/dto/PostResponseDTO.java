package com.nimbus.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class PostResponseDTO {
    private Integer id;
    private String title;
    private String body;
    private Integer userId;
    private String username;
    private Integer categoryId;
    private String categoryName;
    private String profilePicture;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Integer likes;
    private Integer comments;
}
