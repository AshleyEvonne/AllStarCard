package com.sportscards.backend.common;

import com.sportscards.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByEmailAndPassword(String email, String Password);
    @Query("SELECT u FROM User u WHERE u.email = :email")
    Optional<User> findByEmail(String email);
}
