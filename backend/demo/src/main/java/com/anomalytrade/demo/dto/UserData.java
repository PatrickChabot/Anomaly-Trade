// src/main/java/com/anomalytrade/demo/dto/UserData.java
package com.anomalytrade.demo.dto;

public class UserData {
    private String email;
    private String name;
    private String picture;
    private String googleId;
    
    public UserData() {}
    
    public UserData(String email, String name, String picture, String googleId) {
        this.email = email;
        this.name = name;
        this.picture = picture;
        this.googleId = googleId;
    }
    
    // Getters and setters
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getPicture() { return picture; }
    public void setPicture(String picture) { this.picture = picture; }
    
    public String getGoogleId() { return googleId; }
    public void setGoogleId(String googleId) { this.googleId = googleId; }
}