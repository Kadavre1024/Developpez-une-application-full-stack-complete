package com.openclassrooms.mddapi.security;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

/**
 * JwtUtil class
 * for jwt operations
 * @author Guillaume Belaud
 * @version 0.1
 */
@Component
@ConfigurationProperties(prefix = "jwt")
public class JwtUtil {

	private String secretKey; //Secret key : 64 chars
	
	
	/**
	 * Extract the username included into a jwt
	 * @param token		jwt
	 * @return			username
	 */
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    
    /**
	 * Extract the expiration date included into a jwt
	 * @param token		jwt
	 * @return			expiration date
	 */  
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    
    /**
	 * Extract the claims included into a jwt
	 * @param token				jwt
	 * @param claimsResolver		function of part of token to be extract
	 * @return					part of token to be extract
	 */	
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }
    
    
    /**
	 * Extract all claims included into a jwt
	 * @param token				jwt
	 * @return					JWT body with all claims
	 */	
    private Claims extractAllClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
    
    
    /**
	 * Verify if token expired
	 * @param token		jwt
	 * @return			boolean true if token expired else false
	 */	
    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }
    
    
    /**
	 * Verify jwt validity
	 * @param token			jwt
	 * @param userDetails 	user profile of authenticated user
	 * @return				boolean true if token contains the same username as the authenticated user
	 * 						and if it is not expired 
	 * 						else false
	 */	
    public Boolean validateToken(String token, UserDetailsImpl userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
    
    
    /**
	 * Generate a new jwt
	 * @param userName		string corresponding to a username
	 * @return				string corresponding to the created token
	 */	
    public String generateToken(String userName){
        Map<String,Object> claims=new HashMap<>();
        return createToken(claims,userName);
    }
    
    
    /**
	 * Create a new token
	 * @param claims		Object containing all claims
	 * @param userName		string corresponding to a username
	 * @return				jwt
	 */	
    private String createToken(Map<String, Object> claims, String userName) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(userName)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis()+1000*60*20)) //20 min expiration time
                .signWith(getSignKey(), SignatureAlgorithm.HS256)
                .compact();
    }
    
    
    /**
	 * Get the signKey to jwt decoding with a secret key 64bytes
	 * @return		jwt sign key
	 */
    private Key getSignKey() {
        byte[] keyBytes= Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }
    
    
    /**
	 * Set the secret key
	 * @param secretKey		string corresponding to the secret key
	 */	
    public void setSecretKey(String secretKey) {
    	this.secretKey = secretKey;
    }
}

