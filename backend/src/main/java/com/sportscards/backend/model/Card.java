package com.sportscards.backend.model;


import jakarta.persistence.*;
import jdk.jshell.Snippet;
import lombok.*;

import com.sportscards.backend.model.User;
import java.time.LocalDateTime;
import java.util.List;


@AllArgsConstructor
@Data
@NoArgsConstructor
@Entity
@Table(name="card")
public class Card {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name="card_id")
    private Integer id;

//    @Column(name="name", nullable = false, length = 100)
    private String name;

//    @Column(name="type")
    private String type;

//    @Column(name="description", columnDefinition = "TEXT")
    private String description;

//    @Column(name="starting_price", nullable = false, precision = 10)
    private double startingPrice;

//    @Column(name="current_price", precision = 10)
    private double currentPrice;

//    @Enumerated(EnumType.STRING)
//    @Column(name="status", nullable = false)
    private String status;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user; // Represents the user who created the card

//    @Column(name="creation_date", columnDefinition ="TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime creationDate;

//    @Column(name="image_url")
    private String imageUrl;

    @OneToMany(mappedBy="card")
    private List<Bid> bids; //Represents all bids related tp the card


}
