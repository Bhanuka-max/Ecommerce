package com.example.backend.Auth.security;

import com.example.backend.Auth.Enums.Role;
import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.*;
import com.nimbusds.jwt.*;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.crypto.spec.SecretKeySpec;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String SECRET_KEY;



    private static final long EXPIRATION_TIME = 3600000; // 1 hour in milliseconds

    private static final Logger logger = LoggerFactory.getLogger(JwtUtil.class);

    /**
     * Generate JWT token with email and role
     */
    public String generateToken(String userId,String email, Role role) {
        try {
            // Create JWT claims
            JWTClaimsSet claimsSet = new JWTClaimsSet.Builder()
                    .subject(email)
                    .claim("userId",userId)
                    .claim("role", "ROLE_" + role.name())
                    .issueTime(new Date())
                    .expirationTime(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                    .build();

            // Create the signing key and signer
            SecretKeySpec secretKey = new SecretKeySpec(SECRET_KEY.getBytes(), "HmacSHA256");
            JWSSigner signer = new MACSigner(secretKey);

            // Create the JWT with the claims and sign it
            SignedJWT signedJWT = new SignedJWT(
                    new JWSHeader.Builder(JWSAlgorithm.HS256).build(),
                    claimsSet
            );

            signedJWT.sign(signer);

            return signedJWT.serialize();
        } catch (Exception e) {
            throw new RuntimeException("Error while generating JWT", e);
        }
    }

    /**
     * Extract email from token
     */
    public String extractUsername(String token) {
        try {
            SignedJWT signedJWT = SignedJWT.parse(token);

            JWSVerifier verifier = new MACVerifier(SECRET_KEY.getBytes());

            if (signedJWT.verify(verifier)) {
                return signedJWT.getJWTClaimsSet().getSubject();
            }
        } catch (Exception e) {
            throw new RuntimeException("Invalid token", e);
        }
        return null;
    }

    public String getRoleFromToken(String token) {
        try {
            SignedJWT signedJWT = SignedJWT.parse(token);

            JWSVerifier verifier = new MACVerifier(SECRET_KEY.getBytes());

            if (signedJWT.verify(verifier)) {
                return (String) signedJWT.getJWTClaimsSet().getClaim("role");
            }
        } catch (Exception e) {
            throw new RuntimeException("Invalid token", e);
        }
        return null;
    }

    /**
     * Validate token expiration
     */
    public boolean isTokenExpired(String token) {
        try {
            SignedJWT signedJWT = SignedJWT.parse(token);
            return signedJWT.getJWTClaimsSet().getExpirationTime().before(new Date());
        } catch (Exception e) {
            throw new RuntimeException("Invalid token", e);
        }
    }

    public byte[] getSecretKeyBytes() {
    return SECRET_KEY.getBytes();
}

    public String extractUserId(String token) {
        try {
            // Parse the signed JWT token
            SignedJWT signedJWT = SignedJWT.parse(token);

            // Create a verifier using the secret key
            JWSVerifier verifier = new MACVerifier(SECRET_KEY.getBytes());

            // Verify the token's signature
            if (signedJWT.verify(verifier)) {
                // Extract custom claim "userId" from the token claims
                return (String) signedJWT.getJWTClaimsSet().getClaim("userId");
            }
        } catch (Exception e) {
            throw new RuntimeException("Invalid token", e);
        }
        return null;
    }
    /**
     * Validate token using Nimbus signature logic.
     */
    public boolean validateToken(String jwtToken) {
        try {
            SignedJWT signedJWT = SignedJWT.parse(jwtToken);

            // Use MACVerifier for signature validation with the secret key
            JWSVerifier verifier = new MACVerifier(getSecretKeyBytes());
            return signedJWT.verify(verifier);
        } catch (Exception e) {
            logger.warn("Error validating token");
        }
        return false;
    }


}
