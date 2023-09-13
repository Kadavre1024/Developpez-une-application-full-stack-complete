package com.openclassrooms.mddapi.payload;

import lombok.Data;

@Data
public class JwtResponse {
	  private String token;
	  private String type = "Bearer";
	  private Long id;
	  private String username;
	  private String name;
	  private String password;


	  public JwtResponse(String accessToken, String username, Long id, String name, String password) {
	    this.token = accessToken;
	    this.username = username;
	    this.id = id;
	    this.name = name;
	    this.password = password;
	  }
}
