package com.nimbus.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateCommentDTO {
    private String body;
    private Integer userId;
    private Integer postId;
}

