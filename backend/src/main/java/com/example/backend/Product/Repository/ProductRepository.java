package com.example.backend.Product.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import com.example.backend.Product.Repository.ProductRepositoryCustom;
import com.example.backend.Product.Model.Product;
import java.util.List;
import java.util.Optional;

public interface ProductRepository extends MongoRepository<Product, String>, ProductRepositoryCustom {

    // Find products by category
    List<Product> findByCategory(String category);

    // Find products by name containing a keyword (case-insensitive)
    List<Product> findByNameContainingIgnoreCase(String keyword);

    // Custom query to find products with stock greater than a specified value
    @Query("{ 'stock' : { $gt: ?0 } }")
    List<Product> findByStockGreaterThan(int stock);

    List<Product> findByIdIn(List<String> ids);

    Optional<Product> findBySku(String sku);

    public List<Product> getNewArrivals();

    public List<String> findDistinctCategories();
}
