package com.example.backend.Auth.model;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CardDetails {

    private String paymentMethodId; // Stripe's unique identifier for the card
    private String last4;           // Last 4 digits of the card (for display)
    private String cardHolderName;  // Name on the card
    private String expirationDate;  // Expiry date (e.g., "MM/YY")
    private String brand;           // Card brand 
    private boolean isPrimary;      // Default to not primary

    public CardDetails(String cardNumber, String cardHolderName, String expirationDate, String cvv, boolean isPrimary) {
        this.paymentMethodId = null; // Will be set later via Stripe
        this.last4 = cardNumber != null ? cardNumber.substring(cardNumber.length() - 4) : null;
        this.cardHolderName = cardHolderName;
        this.expirationDate = expirationDate;
        this.brand = null; // Will be set via Stripe
        this.isPrimary = isPrimary;
    }
}
