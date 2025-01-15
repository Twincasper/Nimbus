package com.nimbus.backend.service.impl;

import com.nimbus.backend.model.Comment;
import com.nimbus.backend.model.Post;
import com.nimbus.backend.model.User;
import com.nimbus.backend.repository.CommentRepository;
import com.nimbus.backend.repository.PostRepository;
import com.nimbus.backend.repository.UserRepository;
import com.nimbus.backend.service.CommentService;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentServiceImpl implements CommentService {
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final PostRepository postRepository;

    @Autowired
    public CommentServiceImpl(CommentRepository commentRepository, UserRepository userRepository, PostRepository postRepository) {
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
        this.postRepository = postRepository;
    }

    @Transactional
    @Override
    public Comment createComment(String body, Integer userId, Integer postId) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new RuntimeException("Post not found"));
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        Comment createdComment = new Comment();
        createdComment.setBody(body);
        createdComment.setUser(user);
        createdComment.setPost(post);

        return commentRepository.save(createdComment);
    }

    @Transactional
    @Override
    public Comment updateComment(Integer id, String body) {
        Comment comment = commentRepository.findById(id).orElseThrow(() -> new RuntimeException("Comment not found"));
        comment.setBody(body);
        return commentRepository.save(comment);
    }

    @Transactional
    @Override
    public void deleteComment(Integer id) {
        commentRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    @Override
    public Optional<Comment> getCommentById(Integer id) {
        return commentRepository.findById(id);
    }

    @Transactional(readOnly = true)
    @Override
    public List<Comment> getCommentsByPost(Integer postId) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new RuntimeException("Post not found"));
        return commentRepository.findByPost(post);
    }
}
