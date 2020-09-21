package com.example.projectmanagementapp.entities;

import javax.persistence.*;

@Entity
@Table(name = "projects")
public class Project {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Integer id;
    private String projectName, projectDescription;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id", nullable = false)
    private Team team;

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public String getProjectDescription() {
        return projectDescription;
    }

    public void setProjectDescription(String projectDescription) {
        this.projectDescription = projectDescription;
    }

    public Integer getId() {
        return id;
    }

    public Project(String projectName, String projectDescription, Team team) {
        this.projectName = projectName;
        this.projectDescription = projectDescription;
        this.team = team;
    }

    public Project() {
    }
}
