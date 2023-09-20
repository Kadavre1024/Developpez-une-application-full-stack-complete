package com.openclassrooms.mddapi.payload;

import lombok.Data;

/**
 * MessageResponse payload class
 * @author Guillaume Belaud
 * @version 0.1
 */
@Data
public class MessageResponse {

	private String message;

	  public MessageResponse(String message) {
	    this.message = message;
	  }
}
