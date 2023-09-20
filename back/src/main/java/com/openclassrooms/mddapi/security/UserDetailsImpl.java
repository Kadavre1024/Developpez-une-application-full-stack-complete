package com.openclassrooms.mddapi.security;

import java.util.Collection;
import java.util.HashSet;
import java.util.Objects;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

/**
 * UserDetails implementation class
 * @author Guillaume Belaud
 * @version 0.1
 */
@Builder
@AllArgsConstructor
@Getter
public class UserDetailsImpl implements UserDetails {
  private static final long serialVersionUID = 1L;

  private Long id;

  private String username;

  private String name;

  private Boolean admin;

  private String password;  
  
  public Collection<? extends GrantedAuthority> getAuthorities() {        
      return new HashSet<GrantedAuthority>();
  }
  
  /**
   * verify if account is not expired
   * @return always true (there is no account expiration in app)
   */
  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  /**
   * verify if account is not locked
   * @return always true (there is no locking account in app)
   */
  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  /**
   * verify if credentials are not expired
   * @return always true (there is no credentials expiration in app)
   */
  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  /**
   * verify if user is enabled
   * @return always true (always enable)
   */
  @Override
  public boolean isEnabled() {
    return true;
  }

  /**
   * verify if userDetails object is equal to another object
   * @param o	object to compare
   * @return 	true if o is equal to userDetails object
   */
  @Override
  public boolean equals(Object o) {
    if (this == o)
      return true;
    if (o == null || getClass() != o.getClass())
      return false;
    UserDetailsImpl user = (UserDetailsImpl) o;
    return Objects.equals(id, user.id);
  } 
}

