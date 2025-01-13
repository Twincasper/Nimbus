package com.nimbus.backend.repository;

import com.nimbus.backend.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Integer> {
}