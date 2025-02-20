package com.nimbus.backend.service;

public interface LikeService {
    void likePost(Integer postId, Integer userId);
    
    // New method for unliking a post
    void unlikePost(Integer postId, Integer userId);
} 