package com.nimbus.backend.repository;

import com.nimbus.backend.model.Category;
import com.nimbus.backend.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import com.nimbus.backend.model.User;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {
    List<Post> findByUser(User user);

    List<Post> findByTitle(String title); // ideally this would ignore casing

    List<Post> findByCategory(Category category);
}