package com.example.backend.Review.Model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "reviews") // MongoDB collection
public class Review {

    @Id
    private String id;

    @Indexed
    private String productId; // Links the review to a specific product

    @Indexed
    private String orderId; // Links the review to a specific product

    @Indexed
    private String userId; // Links the review to a specific user

    private Integer rating; // Rating out of 5
    private String comment; // User's review

    @CreatedDate
    private LocalDateTime createdAt; // Auto-set on creation

    private String adminReply; // Admin's reply

    @LastModifiedDate
    private LocalDateTime replyCreatedAt; // Auto-updated when admin replies
}

