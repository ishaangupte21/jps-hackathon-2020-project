package com.example.projectmanagementapp.repositories;

import com.example.projectmanagementapp.entities.Team;
import org.springframework.data.repository.CrudRepository;

public interface TeamRepository extends CrudRepository<Team, Integer> {
}
