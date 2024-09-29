package com.sportscards.backend.controller;


import com.sportscards.backend.model.Bid;
import com.sportscards.backend.model.Card;
import com.sportscards.backend.model.User;
import com.sportscards.backend.service.BidService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bid")
public class BidController {
    @Autowired
    private BidService bidService;

    @PostMapping
    public ResponseEntity<Bid> createBid(@RequestBody Bid bid) {
        return ResponseEntity.ok(bidService.createBid(bid));
    }


    @GetMapping("/{id}")
    public ResponseEntity<Bid> getBid(@PathVariable Integer id){
        Bid bid = bidService.getBidById(id);
        return ResponseEntity.ok(bid);
    }

    @GetMapping("/card/{cardId}")
    public ResponseEntity<?> getBidByCardId(@PathVariable Integer cardId) {
        Bid bid = bidService.getBidByCardId(cardId);
        if (bid != null) {
            return ResponseEntity.ok().body(bid);
        } else {
            return ResponseEntity.badRequest().body("Oops no bids");
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBid(@PathVariable Integer id){
        bidService.deleteBidById(id);
        return ResponseEntity.noContent().build();
    }


    // API to get all bids by a specific user ID
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getAllBidsByUser(@PathVariable Integer userId) {
        List<Bid> bids = bidService.findAllBidsByUser(userId);
        if (bids.isEmpty()) {
            return ResponseEntity.ok().body("You have no bids placed");
        }
        return ResponseEntity.ok().body(bids);
    }

}