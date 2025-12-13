package com.example.backend.Auth.security;

import com.example.backend.Auth.service.UserService;
import com.example.backend.Auth.model.User;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collection;
import java.util.Optional;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserService userService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        
        // 🔹 Extract JWT from request cookies
        String jwtToken = extractJwtFromCookies(request);
        
        if (jwtToken != null) {
            try {
                // Validate token before extracting details
                if (!jwtUtil.isTokenExpired(jwtToken) && jwtUtil.validateToken(jwtToken)) {
                    
                    // Extract details from token
                    String email = jwtUtil.extractUsername(jwtToken);
                    String userId = jwtUtil.extractUserId(jwtToken);
                    String userRole = jwtUtil.getRoleFromToken(jwtToken);

                    //  Ensure SecurityContext is not already set
                    SecurityContextHolder.clearContext();

                    if (email != null && userId != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                        // Fetch user details from database
                        Optional<User> userOptional = userService.findByEmail(email);


                        if (userOptional.isPresent()) {

                            //  Create authorities with role prefix
                            Collection<GrantedAuthority> authorities = AuthorityUtils.createAuthorityList(userRole);

                            // Create authentication token (Store userId as principal)
                            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                                    userId, // Store userId as the principal
                                    null,   // No credentials
                                    authorities // Set authorities
                            );

                            //  Set authentication in SecurityContext
                            SecurityContextHolder.getContext().setAuthentication(authToken);
                        }
                    }
                }
            } catch (Exception e) {
                System.out.println("Invalid JWT token: " + e.getMessage()); // 🔹 Improved logging

            }
        }

        chain.doFilter(request, response);
    }

    /**
     * 🔹 Extract JWT token from request cookies
     */
    private String extractJwtFromCookies(HttpServletRequest request) {
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if ("jwt".equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }
}
