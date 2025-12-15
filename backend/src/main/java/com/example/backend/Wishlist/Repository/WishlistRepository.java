package com.example.backend.Wishlist.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.example.backend.Wishlist.Model.WishlistModel;
import java.util.Optional;

@Repository
public interface WishlistRepository extends MongoRepository<WishlistModel, String> {
    Optional<WishlistModel> findByUserId(String userId);
}