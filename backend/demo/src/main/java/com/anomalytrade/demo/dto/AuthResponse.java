// src/main/java/com/anomalytrade/demo/dto/AuthResponse.java
package com.anomalytrade.demo.dto;

public class AuthResponse {
    private String token;
    private UserData user;
    private String error;
    
    // Constructor for success
    public AuthResponse(String token, UserData user) {
        this.token = token;
        this.user = user;
    }
    
    // Constructor for error
    public AuthResponse(String token, UserData user, String error) {
        this.token = token;
        this.user = user;
        this.error = error;
    }
    
    // Getters and setters
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
    public UserData getUser() { return user; }
    public void setUser(UserData user) { this.user = user; }
    public String getError() { return error; }
    public void setError(String error) { this.error = error; }
}