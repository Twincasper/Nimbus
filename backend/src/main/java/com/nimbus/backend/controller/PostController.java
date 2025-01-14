package com.nimbus.backend.controller;

import org.springframework.web.bind.annotation.*;
import com.nimbus.backend.model.Post;
import com.nimbus.backend.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {
    private final PostService postService;

    @Autowired
    public PostController(PostService postService) {
        this.postService = postService;
    }
}
