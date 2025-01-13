package com.nimbus.backend.repository;

import com.nimbus.backend.model.Like;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikeRepository extends JpaRepository<Like, Integer> {
}