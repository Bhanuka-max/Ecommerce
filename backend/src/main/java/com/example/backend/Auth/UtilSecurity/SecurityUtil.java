package com.example.backend.Auth.UtilSecurity;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.GrantedAuthority;
import com.example.backend.Auth.Enums.Role;

public class SecurityUtil {

    public static String getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // Check if authentication exists and is authenticated
        if (authentication != null && authentication.isAuthenticated()) {
            Object principal = authentication.getPrincipal();

            // Assuming principal is the user ID (String), adjust as needed
            if (principal instanceof String) {
                return (String) principal;
            }
        }

        // Return null or throw an exception if user ID is not available
        return null;
    }

    // Static method to check if the current user has a specific role
    public static boolean currentUserHasRole(Role role) {
        
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null) {
            return false;
        }

        // Check if the current user has the specified role
        for (GrantedAuthority authority : authentication.getAuthorities()) {
          
            if (authority.getAuthority().equals("ROLE_"+role.name())) {
                return true;
            }
        }
        return false;
    }

}
