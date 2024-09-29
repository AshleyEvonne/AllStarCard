package com.sportscards.backend.controller;


import com.sportscards.backend.dto.LoginRequest;
import com.sportscards.backend.model.Card;
import com.sportscards.backend.model.User;
import com.sportscards.backend.service.CardService;
import com.sportscards.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private CardService cardService;

    @GetMapping
    public List<User> getAllUsers(){
        return userService.findAll();
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable Integer id){
        return userService.findById(id);
    }
    @PostMapping
    public Optional<User> createUser(@RequestBody User user){
        return userService.saveUser(user);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Integer id){
        userService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody User newUser){
        Optional<User> exisitngUser = userService.findByEmail(newUser.getEmail());
        System.out.println(newUser);

        if(exisitngUser.isPresent()){
            return ResponseEntity.badRequest().body("Email is already in use.");
        }
        Optional<User> registerUser = userService.saveUser(newUser);
        if(registerUser.isPresent()){
            return ResponseEntity.ok().body(registerUser);
        }else {
            return ResponseEntity.badRequest().body("An error has occurred during registration");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        Optional<User> user = userService.loginUser(loginRequest.getEmail(), loginRequest.getPassword());
        if (user.isPresent()) {
            return ResponseEntity.ok().body(user);
        } else {
            return ResponseEntity.badRequest().body("Email or Password is Incorrect");
        }
    }

    // API to get all cards from all bids placed by the user
    @GetMapping("/{userId}/bids/cards")
    public ResponseEntity<List<Card>> getAllCardsFromUserBids(@PathVariable Integer userId) {
        List<Card> cards = cardService.getAllCardsFromUserBids(userId);
        if (!cards.isEmpty()) {
            return ResponseEntity.ok().body(cards);
        } else {
            return ResponseEntity.noContent().build();
        }
    }

}