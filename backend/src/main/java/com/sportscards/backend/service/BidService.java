package com.sportscards.backend.service;

import com.sportscards.backend.common.BidRepository;
import com.sportscards.backend.model.Bid;
import com.sportscards.backend.model.Card;
import com.sportscards.backend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class BidService {
    @Autowired
    private BidRepository bidRepository;

    public Bid placeBid(Card cardId, User userId, double amount){
        Bid bid = new  Bid();
        bid.setCard(cardId);
        bid.setUser(userId);
        bid.setAmount(amount);
        bid.setBidTime(LocalDateTime.now());
        return bidRepository.save(bid);
    }

    public Bid createBid(Bid bid){
        return bidRepository.save(bid);
    }

    public List<Bid> getActiveBids(){
        return bidRepository.findByBidTime(LocalDateTime.now());
    }

    public Bid getBidById(Integer id){
        return bidRepository.findById(id).orElse(null);
    }

    public Bid updateBid(Integer id, Bid updatedBid) {
        Bid existingBid = bidRepository.findById(id).orElseThrow();
        existingBid.setAmount(updatedBid.getAmount());
        return bidRepository.save(existingBid);
    }

    public void deleteBidById(int id){
       if (bidRepository.existsById(id)){
           bidRepository.deleteById(id);
       }else {
           throw new RuntimeException("Bid not found with id:" +id);
       }
    }

    public Bid save(Bid bid){
        return bidRepository.save(bid);
    }
}
