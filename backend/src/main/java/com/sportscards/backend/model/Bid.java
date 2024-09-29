package com.sportscards.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name="Bid")
public class Bid {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name="card_id", nullable = false)
    private Integer cardId; // References the Card entity

    @Column(name="user_id", nullable = false)
    private Integer userId;


    private Double amount;
}
