package com.nimbus.backend.repository;

import com.nimbus.backend.model.Category;
import com.nimbus.backend.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import com.nimbus.backend.model.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {
    List<Post> findByUser(User user);

    List<Post> findByTitleContainingIgnoreCase(String title); // Custom query method

    List<Post> findByCategory(Category category);

    @Query("SELECT p FROM Post p ORDER BY p.createdAt DESC")
    List<Post> findRecentPosts();

    // Custom query for posts by category, but may not be needed if above method works
    // @Query("SELECT p FROM Post p JOIN p.category c WHERE c.id = :categoryId")
    // List<Post> findByCategoryId(@Param("categoryId") Integer categoryId);

}