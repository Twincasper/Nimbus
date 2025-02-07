package com.nimbus.backend.controller;

import com.nimbus.backend.dto.CreatePostDTO;
import com.nimbus.backend.dto.PostResponseDTO;
import com.nimbus.backend.repository.CommentRepository;
import com.nimbus.backend.repository.LikeRepository;
import com.nimbus.backend.service.CategoryService;
import com.nimbus.backend.service.UserService;
import org.springframework.web.bind.annotation.*;
import com.nimbus.backend.model.Post;
import com.nimbus.backend.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/posts")
public class PostController {
    private final PostService postService;
    private final UserService userService;
    private final CategoryService categoryService;

    private final LikeRepository likeRepository;
    private final CommentRepository commentRepository;


    @Autowired
    public PostController(PostService postService, UserService userService, CategoryService categoryService, LikeRepository likeRepository, CommentRepository commentRepository) {
        this.postService = postService;
        this.userService = userService;
        this.categoryService = categoryService;
        this.likeRepository = likeRepository;
        this.commentRepository = commentRepository;
    }

    private PostResponseDTO convertToDTO(Post post) {
        PostResponseDTO dto = new PostResponseDTO();
        dto.setId(post.getId());
        dto.setTitle(post.getTitle());
        dto.setBody(post.getBody());
        dto.setUserId(post.getUser().getId());
        dto.setUsername(post.getUser().getUsername());
        dto.setProfilePicture(post.getUser().getProfilePicture());
        dto.setCategoryId(post.getCategory().getId());
        dto.setCategoryName(post.getCategory().getName());
        dto.setCreatedAt(post.getCreatedAt());
        dto.setUpdatedAt(post.getUpdatedAt());

        int likeCount = likeRepository.countByPostId(post.getId());
        int commentCount = commentRepository.countByPostId(post.getId());

        dto.setLikes(likeCount);
        dto.setComments(commentCount);
        return dto;
    }

    @PostMapping
    public PostResponseDTO createPost(@RequestBody CreatePostDTO createPostDTO) {
        Post post = postService.createPost(
                createPostDTO.getTitle(),
                createPostDTO.getBody(),
                createPostDTO.getUserId(),
                createPostDTO.getCategoryId()
        );
        return convertToDTO(post);
    }

    @GetMapping
    public List<PostResponseDTO> getAllPosts() {
        return postService.getAllPosts().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public PostResponseDTO getPostById(@PathVariable Integer id) {
        Post post = postService.getPostById(id)
                .orElseThrow(() -> new RuntimeException("Post not found"));
        return convertToDTO(post);
    }

    @GetMapping("/user/{userId}")
    public List<PostResponseDTO> getPostsByUser(@PathVariable Integer userId) {
        return postService.getPostsByUser(userId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/recent")
    public List<PostResponseDTO> getRecentPosts() {
        return postService.getRecentPosts().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/category/{categoryId}")
    public List<PostResponseDTO> getPostsByCategory(@PathVariable Integer categoryId) {
        return postService.getPostsByCategory(categoryId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/search")
    public List<PostResponseDTO> getPostsByTitle(@RequestParam String title) {
        return postService.getPostsByTitle(title).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @PutMapping("/{id}")
    public PostResponseDTO updatePost(@PathVariable Integer id, @RequestBody CreatePostDTO postDTO) {
        Post post = new Post();
        post.setTitle(postDTO.getTitle());
        post.setBody(postDTO.getBody());
        Post updatedPost = postService.updatePost(id, post);
        return convertToDTO(updatedPost);
    }

    @DeleteMapping("/{id}")
    public void deletePost(@PathVariable Integer id) {
        postService.deletePost(id);
    }
}