package com.example.projectmanagementapp.controllers;

import com.example.projectmanagementapp.config.JwtTokenUtil;
import com.example.projectmanagementapp.entities.AppUser;
import com.example.projectmanagementapp.entities.Project;
import com.example.projectmanagementapp.entities.Task;
import com.example.projectmanagementapp.entities.Team;
import com.example.projectmanagementapp.repositories.ProjectRepository;
import com.example.projectmanagementapp.repositories.TaskRepository;
import com.example.projectmanagementapp.repositories.TeamRepository;
import com.example.projectmanagementapp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
public class RootController {

    @Autowired private TeamRepository teamRepository;
    @Autowired private JwtTokenUtil jwtTokenUtil;
    @Autowired private UserRepository userRepository;
    @Autowired private ProjectRepository projectRepository;
    @Autowired private TaskRepository taskRepository;

    @PostMapping("/create-team")
    public ResponseEntity<?> createTeam(@RequestBody TeamNameRequest teamNameRequest, @RequestHeader("Authorization") String authToken) {
        String token = authToken.substring(7);
        String username = jwtTokenUtil.getUsernameFromToken(token);
        AppUser appUser = userRepository.findByUsername(username);
        Team team = new Team(teamNameRequest.getTeamName());
        team.setTasks(new ArrayList<>());
        team.setProjects(new ArrayList<>());
        List<AppUser> newMembers = new ArrayList<>();
        newMembers.add(appUser);
        team.setMembers(newMembers);
        teamRepository.save(team);
        List<Team> newUserTeams = appUser.getTeams();
        newUserTeams.add(team);
        appUser.setTeams(newUserTeams);
        return ResponseEntity.ok(201);
    }

    @CrossOrigin
    @GetMapping("/get-teams")
    public ResponseEntity<?> getTeams(@RequestHeader("Authorization")String authToken) {
        String token = authToken.substring(7);
        String username = jwtTokenUtil.getUsernameFromToken(token);
        AppUser appUser = userRepository.findByUsername(username);
        Iterable<Team> teams = teamRepository.findAll();
        List<Team> userTeams = new ArrayList<>();
        for(Team team : teams) {
            List<AppUser> members = team.getMembers();
            if(members.contains(appUser)) {
                userTeams.add(team);
            }
        }

        return ResponseEntity.ok(userTeams);
    }



    @GetMapping("/get-all-teams")
    public ResponseEntity<?> getAllTEams() {
        return ResponseEntity.ok(teamRepository.findAll());
    }

    @GetMapping("/get-team")
    public ResponseEntity<?> getTeamById(@RequestParam("teamid") Integer id){
        return ResponseEntity.ok(teamRepository.findById(id));
    }

    @PostMapping("/add-project")
    public ResponseEntity<?> addProject(@RequestBody AddProjectRequest req) {
        Optional<Team> teamFound = teamRepository.findById(req.getTeamId());
        if(!teamFound.isPresent()) {
            return ResponseEntity.ok(400);
        }
        Team team = teamFound.get();
        projectRepository.save(new Project(req.getProjectName(), req.getProjectDescription(), team));
        return ResponseEntity.ok(201);
    }

    @PostMapping("/add-task")
    public ResponseEntity<?> addTask(@RequestBody TaskRequest req) {
        Optional<Team> teamFound = teamRepository.findById(req.getTeamId());
        if(!teamFound.isPresent()) {
            return ResponseEntity.ok(400);
        }
        Team team = teamFound.get();
        taskRepository.save(new Task(req.getDescription(), false, team));
        return ResponseEntity.ok(201);
    }

    @GetMapping("/get-project")
    public ResponseEntity<?> getProject(@RequestParam("projectid")String projectId, @RequestParam("teamid")String teamId) {
        Optional<Team> teamFound = teamRepository.findById(Integer.parseInt(teamId));
        if(!teamFound.isPresent()) {
            return ResponseEntity.ok(400);
        }
        Team team = teamFound.get();
        int index= Integer.parseInt(projectId) -1 ;
        Project project = team.getProjects().get(index);
        return ResponseEntity.ok(project);
    }

    @GetMapping("/get-username")
    public ResponseEntity<?> getUsername(@RequestHeader("Authorization") String authToken) {
        String token = authToken.substring(7);
        String username = jwtTokenUtil.getUsernameFromToken(token);
        AppUser appUser = userRepository.findByUsername(username);
        return ResponseEntity.ok(appUser.getUsername());
    }


    private static class TeamNameRequest {
        private String teamName;

        public TeamNameRequest(String teamName) {
            this.teamName = teamName;
        }

        public TeamNameRequest() {
        }

        public String getTeamName() {
            return teamName;
        }

        public void setTeamName(String teamName) {
            this.teamName = teamName;
        }
    }
    private static class AddProjectRequest {
        private Integer teamId;
        private String projectName, projectDescription;


        public Integer getTeamId() {
            return teamId;
        }

        public void setTeamId(Integer teamId) {
            this.teamId = teamId;
        }

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

        public void setProjectName(String projectName, String projectDescription) {
            this.projectName = projectName;
            this.projectDescription = projectDescription;
        }
    }

    private static class TaskRequest {
        private String description;
        private Integer teamId;

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }

        public Integer getTeamId() {
            return teamId;
        }

        public void setTeamId(Integer teamId) {
            this.teamId = teamId;
        }

        public TaskRequest(String description, Integer teamId) {
            this.description = description;
            this.teamId = teamId;
        }

        public TaskRequest() {
        }
    }
}
