package com.nimbus.backend.service.impl;

import com.nimbus.backend.model.Category;
import com.nimbus.backend.model.User;
import com.nimbus.backend.repository.CategoryRepository;
import com.nimbus.backend.repository.PostRepository;
import com.nimbus.backend.repository.UserRepository;
import com.nimbus.backend.service.PostService;
import com.nimbus.backend.model.Post;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.List;

@Service
public class PostServiceImpl implements PostService {
    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;


    @Autowired
    public PostServiceImpl(PostRepository postRepository, UserRepository userRepository, CategoryRepository categoryRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
    }

    @Transactional
    @Override
    public Post createPost(String title, String body, Integer userId, Integer categoryId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        Post post = new Post();
        post.setTitle(title);
        post.setBody(body);
        post.setUser(user);
        post.setCategory(category);
        post.setCreatedAt(LocalDateTime.now());
        post.setUpdatedAt(LocalDateTime.now());

        return postRepository.save(post);
    }

    @Transactional
    @Override
    public Post updatePost(Integer id, Post postDetails) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        post.setTitle(postDetails.getTitle());
        post.setBody(postDetails.getBody());

        if (postDetails.getCategory() != null) {
            post.setCategory(postDetails.getCategory());
        }

        return postRepository.save(post);
    }

    @Transactional
    @Override
    public void deletePost(Integer id) {
        postRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    @Override
    public Optional<Post> getPostById(Integer id) {
        return postRepository.findById(id);
    }

    @Override
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    @Override
    public List<Post> getPostsByUser(Integer userId) {
        User searchedUser = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return postRepository.findByUserOrderByCreatedAtDesc(searchedUser);
    }

    @Override
    public List<Post> getPostsByCategory(Integer categoryId) {
        Category searchedCategory = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));
        return postRepository.findByCategoryOrderByCreatedAtDesc(searchedCategory);
    }

    @Override
    public List<Post> getPostsByTitle(String title) {
        return postRepository.findByTitleContainingIgnoreCase(title);
    }

    @Override
    public List<Post> getRecentPosts() {
        return postRepository.findRecentPosts();
    }
}
