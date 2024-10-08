package com.sportscards.backend.common;

import com.sportscards.backend.model.Bid;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BidRepository extends JpaRepository<Bid, Integer> {

    List<Bid> findByUserId(Integer userId);

    Optional<Bid> findByCardIdAndUserId(Integer cardId, Integer userId);

    Optional<Bid> findByCardId(Integer cardId);

}