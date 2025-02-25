package com.nimbus.backend.service;

import com.nimbus.backend.model.Comment;

import java.util.List;
import java.util.Optional;

public interface CommentService {
    Comment createComment(String content, Integer postId, Integer userId);
    List<Comment> getCommentsByPost(Integer postId);
    void deleteComment(Integer id);
    Comment updateComment(Integer commentId, String newBody);
    Optional<Comment> getCommentById(Integer id);
}
