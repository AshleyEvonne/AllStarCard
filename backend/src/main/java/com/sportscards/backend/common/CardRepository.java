package com.sportscards.backend.common;

import com.sportscards.backend.model.Card;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CardRepository extends JpaRepository<Card, Integer> {
    List<Card> findByType(String type);
}
