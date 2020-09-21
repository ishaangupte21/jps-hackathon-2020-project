package com.example.projectmanagementapp.repositories;

import com.example.projectmanagementapp.entities.Task;
import org.springframework.data.repository.CrudRepository;

public interface TaskRepository extends CrudRepository<Task, Integer> {
}
