package com.sportscards.backend.service;

import com.sportscards.backend.common.UserRepository;
import com.sportscards.backend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public List<User> findAll(){
        return userRepository.findAll();
    }

    public User findById(Integer id){
        return userRepository.findById(id).orElse(null);
    }

    public Optional<User> saveUser(User user){
        return Optional.of(userRepository.save(user));
    }

    public void deleteById(Integer id){
        userRepository.deleteById(id);
    }
    public Optional<User> findByEmail(String email){
        return userRepository.findByEmail(email);
    }


    public Optional<User> loginUser(String email, String password) {

        Optional<User> user = userRepository.findByEmail(email);

        if (user.isPresent()) {
            User foundUser = user.get();
            if (foundUser.getPassword().equals(password)) {
                return Optional.of(foundUser);
            }
        }
        return Optional.empty();
    }
}