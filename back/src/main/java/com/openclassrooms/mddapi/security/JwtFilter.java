package com.openclassrooms.mddapi.security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.ExpiredJwtException;

/**
 * JwtFilter class implements OncePerRequestFilter
 * @author Guillaume Belaud
 * @version 0.1
 */
@Component
public class JwtFilter extends OncePerRequestFilter {

	/**
	 * @see com.openclassrooms.mddapi.security.UserDetailsServiceImpl.java
	 */
	@Autowired
    private UserDetailsServiceImpl userDetailsService;

	/**
	 * @see com.openclassrooms.mddapi.security.JwtUtil.java
	 */
    @Autowired
    private JwtUtil jwtUtil;
    
    
    /**
	 * Jwt filter authentication
	 * 		get the jwt contained in the http header to try to authenticate user
	 * @param request		HttpServletRequest
	 * @param response		HttpServletResponse
	 * @param filterChain	Object containing the entire filter chain
	 */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException, ExpiredJwtException {
        String authHeader = request.getHeader("Authorization");
        String token = null;
        String username = null;

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);	//delete 7th characters to extract token
            username = jwtUtil.extractUsername(token);
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetailsImpl userDetails = (UserDetailsImpl) userDetailsService.loadUserByUsername(username);
            try {
            	if (jwtUtil.validateToken(token, userDetails)) {
                    UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                    System.out.println("Authentication : " + authenticationToken);
                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                }
            }catch(ExpiredJwtException e) {
            	response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); 
            	
            }
            
        }

        filterChain.doFilter(request, response);

    }
}
