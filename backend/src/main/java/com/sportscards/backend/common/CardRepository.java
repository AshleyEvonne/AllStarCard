package com.sportscards.backend.common;

import com.sportscards.backend.model.Card;

import jakarta.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface CardRepository extends JpaRepository<Card, Integer> {
    List<Card> findByType(String type);


    // Find all cards where bidTime is older than 7 days
    @Query("SELECT c FROM Card c WHERE c.bidTime <= :sevenDaysAgo")
    List<Card> findAllWithOldBidTimes(LocalDateTime sevenDaysAgo);


}