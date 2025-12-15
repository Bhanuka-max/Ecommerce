package com.example.backend.Review.Repository;

import com.example.backend.Review.Model.Review;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

import java.util.List;

public interface ReviewRepository extends MongoRepository<Review, String> {

    Page<Review> findAll(Pageable pageable);

    Page<Review> findByProductId(String productId, Pageable pageable);

    Optional<Review> findById(String id); // Optional, useful for findById

    boolean existsByUserIdAndProductIdAndOrderId(String userId, String productId, String orderId);

}
