package com.sportscards.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name="user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="user_id")
    private Integer id;
    private String name;
    private String email;
    private String password;

    @OneToMany(mappedBy = "user")
    private List<Card> cards; // Represents cards created by the user

    @OneToMany(mappedBy = "user")
    private List<Bid> bids; // Represents bids made by the user

}
