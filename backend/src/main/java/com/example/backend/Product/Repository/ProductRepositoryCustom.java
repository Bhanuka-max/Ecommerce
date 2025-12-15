package com.example.backend.Product.Repository;

import com.example.backend.Product.Model.Product;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProductRepositoryCustom {
    Page<Product> filterProducts(String name, String category, Double minPrice, Double maxPrice, Pageable pageable);

    public List<Product> getNewArrivals();

    public List<String> findDistinctCategories();
}
