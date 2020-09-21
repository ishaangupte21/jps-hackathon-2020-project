package com.example.projectmanagementapp.repositories;

import com.example.projectmanagementapp.entities.AppUser;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<AppUser, Integer> {
    AppUser findByUsername(String username);
}
