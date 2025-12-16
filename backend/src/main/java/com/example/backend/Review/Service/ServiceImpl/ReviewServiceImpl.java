package com.example.backend.Review.Service.ServiceImpl;

import com.example.backend.Review.Model.Review;
import com.example.backend.Review.Repository.ReviewRepository;
import com.example.backend.Review.Service.ReviewService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.List;

@Service
public class ReviewServiceImpl implements ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Override
    public Page<Review> getAllReviews(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return reviewRepository.findAll(pageable);
    }

    @Override
    public Page<Review> getReviewsByProductId(String productId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return reviewRepository.findByProductId(productId, pageable);
    }

    @Override
    public Review addReview(Review review) {
        return reviewRepository.save(review);
    }

    @Override
    public Review updateReview(String id, Review review) {
        Review existingReview = reviewRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Review not found"));
        existingReview.setRating(review.getRating());
        existingReview.setComment(review.getComment());
        return reviewRepository.save(existingReview);
    }

    @Override
    public void deleteReview(String id) {
        if (!reviewRepository.existsById(id)) {
            throw new RuntimeException("Review not found");
        }
        reviewRepository.deleteById(id);
    }

    @Override
    public Review replyToReview(String reviewId, String reply) {
        Review existingReview = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new RuntimeException("Review not found"));
        existingReview.setAdminReply(reply);
        return reviewRepository.save(existingReview);
    }

    @Override
    public boolean existsByUserIdAndProductIdAndOrderId(String userId, String productId, String orderId) {
        return reviewRepository.existsByUserIdAndProductIdAndOrderId(userId, productId, orderId);
    }
}