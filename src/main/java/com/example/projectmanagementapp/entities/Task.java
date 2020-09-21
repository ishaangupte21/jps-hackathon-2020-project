package com.example.projectmanagementapp.entities;

import javax.persistence.*;

@Entity
@Table(name="tasks")
public class Task {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Integer id;
    private String todoDescription;
    private Boolean todoCompleted;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id", nullable = false)
    private Team team;

    public String getTodoDescription() {
        return todoDescription;
    }

    public Boolean getTodoCompleted() {
        return todoCompleted;
    }

    public Task(String todoDescription, Boolean todoCompleted, Team team) {
        this.todoDescription = todoDescription;
        this.todoCompleted = todoCompleted;
        this.team = team;
    }

    public Integer getId() {
        return id;
    }

    public Task() {
    }
}
