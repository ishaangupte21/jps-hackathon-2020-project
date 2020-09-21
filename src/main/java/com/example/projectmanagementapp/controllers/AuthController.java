package com.example.projectmanagementapp.controllers;

import com.example.projectmanagementapp.config.JwtTokenUtil;
import com.example.projectmanagementapp.config.JwtUserDetailsService;
import com.example.projectmanagementapp.entities.AppUser;
import com.example.projectmanagementapp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
@CrossOrigin
public class AuthController {
    @Autowired private AuthenticationManager authenticationManager;
    @Autowired private JwtTokenUtil jwtTokenUtil;
    @Autowired private JwtUserDetailsService userDetailsService;
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private UserRepository repository;

    @PostMapping("/auth/login")
    public ResponseEntity<?> authenticateUser(@RequestBody AuthRequest req) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(req.getUsername(), req.getPassword()));
            final UserDetails userDetails = userDetailsService.loadUserByUsername(req.getUsername());
            String token = jwtTokenUtil.generateToken(userDetails);
            return ResponseEntity.ok(new AuthResponse(token));
        } catch (DisabledException e) {
            return ResponseEntity.badRequest().body(new AuthResponse("User Disabled"));
        } catch (BadCredentialsException e) {
            return ResponseEntity.badRequest().body(new AuthResponse("Incorrect Username or Password"));
        }
    }

    @PostMapping("/auth/register")
    public ResponseEntity<?> registerUser(@RequestBody AuthRequest req) {
        AppUser appUser = new AppUser(req.getUsername(), passwordEncoder.encode(req.getPassword()), req.getEmail());
        appUser.setTeams(new ArrayList<>());
        repository.save(appUser);
        final UserDetails userDetails = userDetailsService.loadUserByUsername(appUser.getUsername());
        String token = jwtTokenUtil.generateToken(userDetails);
        return ResponseEntity.ok(new AuthResponse(token));

    }

    private static class AuthRequest {
        private String username, password, email;

        public AuthRequest(String username, String password, String email) {
            this.username = username;
            this.password = password;
            this.email = email;
        }

        public AuthRequest() {
        }

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }
    }

    private static class AuthResponse {
        private Object data;

        public AuthResponse(Object data) {
            this.data = data;
        }

        public AuthResponse() {
        }

        public Object getData() {
            return data;
        }

        public void setData(Object data) {
            this.data = data;
        }
    }
}
