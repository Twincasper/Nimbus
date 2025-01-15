package com.nimbus.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

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
    private Instant createdAt;
    private Instant updatedAt;
}
