package com.nimbus.backend.controller;

import com.nimbus.backend.dto.CommentResponseDTO;
import com.nimbus.backend.dto.CreateCommentDTO;
import com.nimbus.backend.model.Comment;
import com.nimbus.backend.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    private final CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    private CommentResponseDTO convertToDTO(Comment comment) {
        CommentResponseDTO dto = new CommentResponseDTO();
        dto.setId(comment.getId());
        dto.setBody(comment.getBody());
        dto.setUserId(comment.getUser().getId());
        dto.setUsername(comment.getUser().getUsername());
        dto.setPostId(comment.getPost().getId());
        dto.setCreatedAt(comment.getCreatedAt());
        dto.setUpdatedAt(comment.getUpdatedAt());
        return dto;
    }

    @PostMapping
    public CommentResponseDTO createComment(@RequestBody CreateCommentDTO createCommentDTO) {
        Comment comment = commentService.createComment(
                createCommentDTO.getBody(),
                createCommentDTO.getUserId(),
                createCommentDTO.getPostId()
        );
        return convertToDTO(comment);
    }

    @PutMapping("/{id}")
    public CommentResponseDTO updateComment(@PathVariable Integer id, @RequestBody CreateCommentDTO updatedComment) {
        Comment comment = commentService.updateComment(id, updatedComment.getBody());
        return convertToDTO(comment);
    }

    @DeleteMapping("/{id}")
    public void deleteComment(@PathVariable Integer id) {
        commentService.deleteComment(id);
    }

    @GetMapping("/{id}")
    public Optional<CommentResponseDTO> getCommentById(@PathVariable Integer id) {
        Comment comment = commentService.getCommentById(id).orElse(null);
        if (comment == null) {
            return Optional.empty();
        }
        return Optional.of(convertToDTO(comment));
    }

    @GetMapping("/post/{postId}")
    public List<CommentResponseDTO> getCommentsByPost(@PathVariable Integer postId) {
        return commentService.getCommentsByPost(postId)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
}
