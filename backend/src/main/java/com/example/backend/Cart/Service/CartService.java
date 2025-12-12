package com.example.backend.Cart.Service;

import java.util.List;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.Cart.Model.CartModel;
import com.example.backend.Cart.Repository.CartRepository;
import com.example.backend.Product.Model.Product;
import com.example.backend.Product.Service.ProductService;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductService productService;

    // Get cart with product details for the user
    public CartModel getCartWithProductDetails(String userId) {
        CartModel cart = getCartByUserId(userId);

        // Extract product IDs from the cart items
        List<String> productIds = cart.getItems().stream()
                .map(CartModel.Item::getProductId)
                .collect(Collectors.toList());

        // Fetch product details in batch from MongoDB
        List<Product> products = productService.getProductsByIds(productIds);

        // Map product details to cart items
        for (CartModel.Item item : cart.getItems()) {
            Product product = products.stream()
                    .filter(p -> p.getId().equals(item.getProductId()))
                    .findFirst()
                    .orElse(null);

            if (product != null) {
                item.setProductDetails(product);
            }
        }

        return cart;
    }

    // Get cart by userId
    public CartModel getCartByUserId(String userId) {
        return cartRepository.findByUserId(userId)
                .orElseGet(() -> createEmptyCart(userId));
    }

    public CartModel addItemToCart(String userId, String productId, int quantity, Map<String, String> variation) {
        CartModel cart = getCartByUserId(userId);
    
        // Check if an item with the same productId and variation exists
        Optional<CartModel.Item> existingItem = cart.getItems().stream()
                .filter(item -> item.getProductId().equals(productId) && item.getVariation().equals(variation))
                .findFirst();
    
        if (existingItem.isPresent()) {
            // Update quantity if the item exists
            existingItem.get().setQuantity(existingItem.get().getQuantity() + quantity);
        } else {
            // Add a new item with the given variation
            CartModel.Item newItem = new CartModel.Item();
            newItem.setProductId(productId);
            newItem.setQuantity(quantity);
            newItem.setVariation(variation);
            cart.getItems().add(newItem);
        }
    
        // Save and return the updated cart
        return cartRepository.save(cart);
    }
    

    public CartModel removeItemFromCart(String userId, String productId, Map<String, String> variation) {
        CartModel cart = getCartByUserId(userId);
        
        cart.getItems().forEach(item -> {
            System.out.println("Item Product ID: " + item.getProductId() + ", Variation: " + item.getVariation());
        });
        
        System.out.println(variation);
        // Ensure the variation is not null before comparing
        cart.getItems().removeIf(item -> 
            item.getProductId().equals(productId) && 
            (variation == null || variation.equals(item.getVariation()))
        );
    
        // Save and return the updated cart
        return cartRepository.save(cart);
    }
    



    // Clear the entire cart
    public void clearCart(String userId) {
        CartModel cart = getCartByUserId(userId);
        cart.getItems().clear();
        cartRepository.save(cart);
    }

    // Helper method to create a new empty cart for a user
    private CartModel createEmptyCart(String userId) {
        CartModel newCart = new CartModel();
        newCart.setUserId(userId);
        return cartRepository.save(newCart);
    }
}
