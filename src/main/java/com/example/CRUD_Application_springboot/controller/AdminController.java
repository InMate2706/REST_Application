package com.example.CRUD_Application_springboot.controller;

import com.example.CRUD_Application_springboot.model.Role;
import com.example.CRUD_Application_springboot.model.User;
import com.example.CRUD_Application_springboot.repository.RoleRepository;
import com.example.CRUD_Application_springboot.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;

@Controller
public class AdminController {

    private RoleRepository roleRepository;

    @Autowired
    public void setRoleRepository(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    private UserService userService;

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/admin")
    public String adminHome(@AuthenticationPrincipal User admin, Model model) {
        model.addAttribute("users", userService.getUsers());
        model.addAttribute("admin", admin);
        model.addAttribute("user", new User());

        return "admin";
    }

    @PostMapping("/user-create")
    public String saveUser(@ModelAttribute("userForm") User userForm, @RequestParam("role") Long[] role) {
        Set<Role> roles = new HashSet<>();

        for (Long l : role) {
            roles.add(roleRepository.getRoleById(l));
        }
        userForm.setRoles(roles);
        userService.save(userForm);

        return "redirect:/admin";
    }

    @PostMapping("/user-delete")
    public String deleteUser(@RequestParam Long idDelete) {
        userService.deleteById(idDelete);

        return "redirect:/admin";
    }

    @PostMapping("/user-edit")
    public String saveUser(@RequestParam Long idEdit,
                           @RequestParam byte ageEdit,
                           @RequestParam String firstNameEdit,
                           @RequestParam String lastNameEdit,
                           @RequestParam String passwordEdit,
                           @RequestParam String emailEdit,
                           @RequestParam(value = "newRoles", required = false) Long[] newRoles) {

        User user = userService.findUserById(idEdit);

        user.setPassword(passwordEdit);
        if (newRoles != null) {
            Set<Role> roles = new HashSet<>();

            for (Long role : newRoles) {
                roles.add(roleRepository.getRoleById(role));
            }
            user.setRoles(roles);
        }
        user.setFirstName(firstNameEdit);
        user.setLastName(lastNameEdit);
        user.setEmail(emailEdit);
        user.setAge(ageEdit);
        userService.update(user);

        return "redirect:/admin";
    }
}
