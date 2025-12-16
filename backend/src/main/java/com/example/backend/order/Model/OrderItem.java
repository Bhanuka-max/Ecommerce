package com.example.backend.order.Model;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderItem {
    private String productId;
    private int quantity;
    private double price;
    private Map<String, String> variation; // Stores variation as key-value (e.g., {"color": "Gold"})

    public String getVariationType() {
        return variation != null && !variation.isEmpty() ? variation.keySet().iterator().next() : null;
    }

    public String getVariationValue() {
        return variation != null && !variation.isEmpty() ? variation.values().iterator().next() : null;
    }
}
