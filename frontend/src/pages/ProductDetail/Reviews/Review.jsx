import React from 'react';
import './Review.css'; // Assume this file contains necessary styling

const Review = ({ review }) => {
  return (
    <div className="review-card">
      <div className="review-header">
        <span className="review-user">User ID: {review.userId}</span>
        <span className="review-date">Reviewed on: {new Date(review.createdAt).toLocaleDateString()}</span>
        <div className="review-rating">Rating: {review.rating}/5</div>
      </div>
      <div className="review-body">
        <p className="review-comment">"{review.comment}"</p>
        
      </div>
      {review.adminReply && (
        <div className="review-admin-reply">
          <span className="reply-label">Admin Reply: <span className="reply-date">Replied on: {new Date(review.replyCreatedAt).toLocaleDateString()}</span></span>
          <p>{review.adminReply}</p>
          
        </div>
      )}
    </div>
  );
};

export default Review;
