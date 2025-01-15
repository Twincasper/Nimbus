package com.nimbus.backend.controller;

import com.nimbus.backend.model.Comment;
import com.nimbus.backend.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    private final CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping("/create")
    public Comment createComment(@RequestParam String body, @RequestParam Integer userId, @RequestParam Integer postId) {
        return commentService.createComment(body, userId, postId);
    }

    @PutMapping("update/{id}")
    public Comment updateComment(@PathVariable Integer id ,@RequestParam String body) {
        return commentService.updateComment(id, body);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteComment(@PathVariable Integer id) {
        commentService.deleteComment(id);
        return "Comment deleted, bye bye :("; // prob not a necessary string return
    }

    @GetMapping("/{id}")
    public Optional<Comment> getCommentById(@PathVariable Integer id) {
        return commentService.getCommentById(id);
    }

    @GetMapping("/post/{postId}")
    public List<Comment> getCommentsByPost(@PathVariable Integer postId) {
        return commentService.getCommentsByPost(postId);
    }
}
