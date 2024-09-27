package com.sportscards.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name="Bid")
public class Bid {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name="card_id", nullable=false)
  private Card card;

    @ManyToOne
    @JoinColumn(name="user_id", nullable = false)
   private User user;


    private Double amount;
    private LocalDateTime bidTime;

    public void setCard(Card cardId) {
    }

    public void setUser(User userId) {
    }
}
