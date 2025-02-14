package com.nimbus.backend.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
public class CommentResponseDTO {
    private Integer id;
    private String body;
    private Integer userId;
    private String username;
    private String profilePicture;
    private String pronouns;
    private Integer postId;
    private Instant createdAt;
    private Instant updatedAt;
}

