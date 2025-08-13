package com.anomalytrade.demo.service;

import java.util.Date;

import javax.crypto.SecretKey;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.util.StringUtils;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import com.anomalytrade.demo.dto.AuthResponse;
import com.anomalytrade.demo.dto.UserData;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class AuthService {
    
    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);
    
    @Value("${google.client-id}")
    private String googleClientId;
    
    @Value("${google.client-secret}")
    private String googleClientSecret;
    
    @Value("${jwt.secret}")
    private String jwtSecret;
    
    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();
    
    public AuthResponse authenticateWithGoogle(String code) throws Exception {
        // Validate input
        if (!StringUtils.hasText(code)) {
            throw new IllegalArgumentException("Authorization code cannot be empty");
        }
        
        logger.debug("Starting Google OAuth authentication");
        
        // Step 1: Exchange authorization code for access token
        String accessToken = exchangeCodeForToken(code);
        
        // Step 2: Get user info from Google
        UserData userData = getUserInfoFromGoogle(accessToken);
        
        // Step 3: Generate JWT for our app
        String jwtToken = generateJwtToken(userData);
        
        logger.info("Authentication completed successfully for user: {}", userData.getEmail());
        return new AuthResponse(jwtToken, userData);
    }
    
    private String exchangeCodeForToken(String code) throws Exception {
        String tokenUrl = "https://oauth2.googleapis.com/token";
        
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("client_id", googleClientId);
        params.add("client_secret", googleClientSecret);
        params.add("code", code);
        params.add("grant_type", "authorization_code");
        params.add("redirect_uri", "http://localhost:5173/auth/callback");
        
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);
        
        try {
            String response = restTemplate.postForObject(tokenUrl, request, String.class);
            JsonNode jsonNode = objectMapper.readTree(response);
            
            if (jsonNode.has("error")) {
                throw new RuntimeException("Google OAuth error: " + jsonNode.get("error_description").asText());
            }
            
            return jsonNode.get("access_token").asText();
        } catch (HttpClientErrorException e) {
            logger.error("Failed to exchange code for token: {}", e.getMessage());
            throw new RuntimeException("Failed to authenticate with Google: " + e.getMessage());
        }
    }
    
    private UserData getUserInfoFromGoogle(String accessToken) throws Exception {
        String userInfoUrl = "https://www.googleapis.com/oauth2/v2/userinfo?access_token=" + accessToken;
        
        try {
            String response = restTemplate.getForObject(userInfoUrl, String.class);
            JsonNode jsonNode = objectMapper.readTree(response);
            
            // Validate required fields
            if (!jsonNode.has("email") || !jsonNode.has("name")) {
                throw new RuntimeException("Invalid user info received from Google");
            }
            
            return new UserData(
                jsonNode.get("email").asText(),
                jsonNode.get("name").asText(),
                jsonNode.has("picture") ? jsonNode.get("picture").asText() : null,
                jsonNode.get("id").asText()
            );
        } catch (HttpClientErrorException e) {
            logger.error("Failed to get user info: {}", e.getMessage());
            throw new RuntimeException("Failed to get user information from Google");
        }
    }
    
    private String generateJwtToken(UserData userData) {
        // Shorter expiration for better security (1 hour instead of 24)
        long expirationTime = 3600000; // 1 hour
        
        SecretKey key = Keys.hmacShaKeyFor(jwtSecret.getBytes());
        
        return Jwts.builder()
            .setSubject(userData.getEmail())
            .claim("name", userData.getName())
            .claim("email", userData.getEmail())
            .claim("picture", userData.getPicture())
            .claim("googleId", userData.getGoogleId())
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
            .signWith(key)
            .compact();
    }
}