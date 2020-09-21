package com.example.projectmanagementapp.config;

import com.example.projectmanagementapp.entities.AppUser;
import com.example.projectmanagementapp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class JwtUserDetailsService implements UserDetailsService {

    @Autowired private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser appUser = userRepository.findByUsername(username);
        if(appUser == null) {
            throw new UsernameNotFoundException("No user with this username");
        }

        return new User(appUser.getUsername(), appUser.getPassword(), Collections.emptyList());
    }
}
