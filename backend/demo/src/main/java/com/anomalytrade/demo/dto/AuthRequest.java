package com.anomalytrade.demo.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class AuthRequest {
    
    @NotBlank(message = "Authorization code is required")
    @Size(min = 10, max = 2000, message = "Authorization code must be between 10 and 2000 characters")
    private String code;
    
    // Default constructor
    public AuthRequest() {}
    
    // Constructor with parameter
    public AuthRequest(String code) {
        this.code = code;
    }
    
    // Getter
    public String getCode() { 
        return code; 
    }
    
    // Setter
    public void setCode(String code) { 
        this.code = code; 
    }
}