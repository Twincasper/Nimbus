package com.nimbus.backend.service;

import com.nimbus.backend.model.Category;

import java.util.List;
import java.util.Optional;

public interface CategoryService {
//    Category createCategory(String name);
//
//    Category updateCategory(Integer id, Category categoryDetails);
//
//    void deleteCategory(Integer id); prob not going to need crud but will keep for now

    Optional<Category> getCategoryById(Integer id);

    List<Category> getAllCategories();
}
