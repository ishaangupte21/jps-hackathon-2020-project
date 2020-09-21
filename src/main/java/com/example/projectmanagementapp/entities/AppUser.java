package com.example.projectmanagementapp.entities;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="users")
public class AppUser {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Integer id;
    private String username, password, email;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name="user_teams", joinColumns = @JoinColumn(name="team_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"))
    private List<Team> teams;

    public AppUser(String username, String password, String email) {
        this.username = username;
        this.password = password;
        this.email = email;
    }

    public AppUser() {
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

    public Integer getId() {
        return id;
    }

    public List<Team> getTeams() {
        return teams;
    }

    public void setTeams(List<Team> teams) {
        this.teams = teams;
    }
}
