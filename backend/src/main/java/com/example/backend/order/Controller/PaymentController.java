package com.example.backend.order.Controller;

import com.example.backend.order.Service.StripeService;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class PaymentController {

    @Autowired
    private StripeService stripeService;



    /**
     * Create a PaymentIntent for the given payment method, amount, and currency.
     * 
     * @param paymentRequest The request body containing payment details.
     * @return Response with PaymentIntent or error message.
     */
    @PostMapping("/create-payment-intent")
    public ResponseEntity<?> createPaymentIntent(@RequestBody PaymentRequest paymentRequest) {
        try {
            // Validate the amount
            if (paymentRequest.getAmount() <= 0) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Amount must be greater than zero.");
            }
    
            // Call Stripe service to create the payment intent
            PaymentIntent paymentIntent = stripeService.createPaymentIntent(
                paymentRequest.getPaymentMethodId(), 
                paymentRequest.getAmount(), 
                paymentRequest.getCurrency()
            );
    
            // Create a response object to return both client_secret and status
            PaymentIntentResponse response = new PaymentIntentResponse(
                paymentIntent.getClientSecret(),
                paymentIntent.getStatus() // Retrieve the status of the PaymentIntent
            );
    
            return ResponseEntity.ok(response);
        } catch (StripeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Payment creation failed: " + e.getMessage());
        }
    }
    

    /**
     * PaymentRequest model to capture necessary payment data from frontend.
     */
    public static class PaymentRequest {
        private String paymentMethodId;
        private int amount;
        private String currency;

        // Getters and Setters
        public String getPaymentMethodId() {
            return paymentMethodId;
        }

        public void setPaymentMethodId(String paymentMethodId) {
            this.paymentMethodId = paymentMethodId;
        }

        public int getAmount() {
            return amount;
        }

        public void setAmount(int amount) {
            this.amount = amount;
        }

        public String getCurrency() {
            return currency;
        }

        public void setCurrency(String currency) {
            this.currency = currency;
        }
    }


    public class PaymentIntentResponse {
        private String clientSecret;
        private String status;
    
        public PaymentIntentResponse(String clientSecret, String status) {
            this.clientSecret = clientSecret;
            this.status = status;
        }
    
        // Getters and Setters
        public String getClientSecret() {
            return clientSecret;
        }
    
        public void setClientSecret(String clientSecret) {
            this.clientSecret = clientSecret;
        }
    
        public String getStatus() {
            return status;
        }
    
        public void setStatus(String status) {
            this.status = status;
        }
    }
    
}
