package com.nimbus.backend.repository;

import com.nimbus.backend.model.Comment;
import com.nimbus.backend.model.Post;
import com.nimbus.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
    List<Comment> findByPost(Post post);
    List<Comment> findByUser(User user);
}