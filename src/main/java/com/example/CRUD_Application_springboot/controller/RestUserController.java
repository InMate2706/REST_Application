package com.example.CRUD_Application_springboot.controller;

import com.example.CRUD_Application_springboot.model.Role;
import com.example.CRUD_Application_springboot.model.User;
import com.example.CRUD_Application_springboot.repository.RoleRepository;
import com.example.CRUD_Application_springboot.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/admin")
public class RestUserController {

    private UserService userService;

    private RoleRepository roleRepository;

    @Autowired
    public void setRoleRepository(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }


    @GetMapping(value = "/users/{id}")
    public ResponseEntity<User> getUser(@PathVariable("id") Long id) {
        User user = userService.findUserById(id);

        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping(value = "/users")
    public ResponseEntity<List<User>> getUsers() {
        List<User> users = userService.getUsers();

        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<User> deleteUser(@PathVariable("id") Long id) {
        userService.deleteById(id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/edit")
    public ResponseEntity<User> updateUser(@RequestBody User user,
                                           @RequestParam(value = "roles", required = false) Long[] roles) {
        if (roles != null) {
            Set<Role> userRoles = new HashSet<>();

            for (Long role : roles) {
                userRoles.add(roleRepository.getRoleById(role));
            }
            user.setRoles(userRoles);
        }

        userService.update(user);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/users")
    public ResponseEntity<User> saveUser(@RequestBody User user,
                                         @RequestParam(value = "roles", required = false) Long[] roles) {
        if (roles != null) {
            Set<Role> userRoles = new HashSet<>();

            for (Long role : roles) {
                userRoles.add(roleRepository.getRoleById(role));
            }
            user.setRoles(userRoles);
        }

        userService.save(user);

        return new ResponseEntity<>(user, HttpStatus.OK);
    }
}
