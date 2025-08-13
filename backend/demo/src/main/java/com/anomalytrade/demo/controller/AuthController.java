package com.anomalytrade.demo.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.anomalytrade.demo.dto.AuthRequest;
import com.anomalytrade.demo.dto.AuthResponse;
import com.anomalytrade.demo.service.AuthService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class AuthController {
    
    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
    
    @Autowired
    private AuthService authService;
    
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody AuthRequest request, BindingResult bindingResult) {
        try {
            // Check for validation errors
            if (bindingResult.hasErrors()) {
                logger.warn("Invalid login request: {}", bindingResult.getAllErrors());
                String errorMessage = bindingResult.hasFieldErrors() 
                    ? bindingResult.getFieldErrors().get(0).getDefaultMessage()
                    : "Invalid request data";
                return ResponseEntity.badRequest().body(
                    new AuthResponse(null, null, "Invalid request: " + errorMessage)
                );
            }
            
            // Log successful authentication attempt (don't log the actual code for security)
            logger.info("Processing authentication request");
            
            AuthResponse response = authService.authenticateWithGoogle(request.getCode());
            
            logger.info("Authentication successful for user: {}", response.getUser().getEmail());
            return ResponseEntity.ok(response);
            
        } catch (IllegalArgumentException e) {
            logger.warn("Invalid request: {}", e.getMessage());
            return ResponseEntity.badRequest().body(
                new AuthResponse(null, null, "Invalid request: " + e.getMessage())
            );
        } catch (Exception e) {
            logger.error("Authentication failed: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                new AuthResponse(null, null, "Authentication failed. Please try again.")
            );
        }
    }
}