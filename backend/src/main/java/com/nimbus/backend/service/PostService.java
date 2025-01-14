package com.nimbus.backend.service;

import com.nimbus.backend.model.Post;

import java.util.List;
import java.util.Optional;

public interface PostService {
    Post createPost(String title, String body, Integer userId);

    Post updatePost(Integer id, Post postDetails);

    void deletePost(Integer id);

    Optional<Post> getPostById(Integer id);

    List<Post> getAllPosts();

    List<Post> getPostsByUserId(Integer userId);

    List<Post> getPostsByCategoryId(Integer categoryId);
}
