package com.nimbus.backend.service.impl;

import com.nimbus.backend.model.Category;
import com.nimbus.backend.model.User;
import com.nimbus.backend.repository.CategoryRepository;
import com.nimbus.backend.repository.PostRepository;
import com.nimbus.backend.repository.UserRepository;
import com.nimbus.backend.service.PostService;
import com.nimbus.backend.model.Post;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;
import java.util.List;

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

    @Override
    public Post createPost(String title, String body, Integer userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Post createdPost = new Post();
        createdPost.setTitle(title);
        createdPost.setBody(body);
        createdPost.setUser(user);

        return postRepository.save(createdPost);
    }

    @Override
    public Post updatePost(Integer id, Post postDetails) {
        Post post = postRepository.findById(id).orElseThrow(() -> new RuntimeException("Post not found"));

        post.setTitle(postDetails.getTitle());
        post.setBody(postDetails.getBody());

        return postRepository.save(post);
    }

    @Override
    public void deletePost(Integer id) {
        postRepository.deleteById(id);
    }

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
        User searchedUser = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        return postRepository.findByUser(searchedUser);
    }

    @Override
    public List<Post> getPostsByCategory(Integer categoryId) {
        Category searchedCategory = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));
        return postRepository.findByCategory(searchedCategory);
    }

    @Override
    public List<Post> getPostsByTitle(String title) {
        return postRepository.findByTitle(title);
    }
}
