package com.example.projectmanagementapp.repositories;

import com.example.projectmanagementapp.entities.Project;
import org.springframework.data.repository.CrudRepository;

public interface ProjectRepository extends CrudRepository<Project, Integer> {
}
