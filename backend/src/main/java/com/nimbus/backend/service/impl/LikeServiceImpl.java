package com.nimbus.backend.service.impl;

import com.nimbus.backend.model.Like;
import com.nimbus.backend.model.Post;
import com.nimbus.backend.model.User;
import com.nimbus.backend.repository.LikeRepository;
import com.nimbus.backend.repository.PostRepository;
import com.nimbus.backend.repository.UserRepository;
import com.nimbus.backend.service.LikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class LikeServiceImpl implements LikeService {

    private final LikeRepository likeRepository;
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    @Autowired
    public LikeServiceImpl(LikeRepository likeRepository, PostRepository postRepository, UserRepository userRepository) {
        this.likeRepository = likeRepository;
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }

    @Override
    public void likePost(Integer postId, Integer userId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Optionally, check if the like already exists to prevent duplicates
        if (likeRepository.existsByUserIdAndPostId(userId, postId)) {
            throw new RuntimeException("Post already liked by user");
        }

        Like like = new Like();
        like.setPost(post);
        like.setUser(user);
        like.setCreatedAt(Instant.now());

        likeRepository.save(like);
    }
} 