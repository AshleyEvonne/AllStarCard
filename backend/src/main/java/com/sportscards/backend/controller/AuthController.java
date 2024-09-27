package com.sportscards.backend.controller;

import com.sportscards.backend.model.User;
import com.sportscards.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

//public class AuthController {
//
//
//    @RestController
//    @RequestMapping("/api/auth")
//    public class AuthController {
//
//        private final UserService userService;
//
//        public AuthController(UserService userService) {
//            this.userService = userService;
//        }
//
//        @PostMapping("/login")
//        public ResponseEntity<?> login(@RequestBody User user) {
//
//        }
//    }
//
//}
