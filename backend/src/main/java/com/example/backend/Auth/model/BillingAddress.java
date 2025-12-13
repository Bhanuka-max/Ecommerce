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
public class BillingAddress {
    private String address;
    private String city;
    private String state;
    private String zipCode;
    private String country;
    private String phone;
    private boolean isPrimary; // Default to not primary
}
