package com.example.projectmanagementapp.entities;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "teams")
public class Team {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Integer id;
    private String teamName;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "team")
    private List<Project> projects;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "team")
    private List<Task> tasks;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable
    private List<AppUser> members;

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    public List<Project> getProjects() {
        return projects;
    }

    public void setProjects(List<Project> projects) {
        this.projects = projects;
    }

    public List<Task> getTasks() {
        return tasks;
    }

    public void setTasks(List<Task> tasks) {
        this.tasks = tasks;
    }

    public List<AppUser> getMembers() {
        return members;
    }

    public void setMembers(List<AppUser> members) {
        this.members = members;
    }

    public Integer getId() {
        return id;
    }

    public Team(String teamName) {
        this.teamName = teamName;
    }

    public Team() {
    }


}
