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
//    public ResponseEntity<Bid> placeBid(@RequestParam Card cardId, @RequestParam User userId, @RequestParam Double amount){
//        Bid bid = bidService.placeBid(cardId, userId, amount);
//        return ResponseEntity.ok(bid);
//    }
    public ResponseEntity<Bid> createBid(@RequestBody Bid bid) {
        return ResponseEntity.ok(bidService.createBid(bid));
    }


    @GetMapping("/{id}")
    public ResponseEntity<Bid> getBid(@PathVariable Integer id){
        Bid bid = bidService.getBidById(id);
        return ResponseEntity.ok(bid);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBid(@PathVariable Integer id){
        bidService.deleteBidById(id);
        return ResponseEntity.noContent().build();
    }

//    @PutMapping
//    public ResponseEntity<Bid> createBid(@RequestBody Bid bid){
//        Bid savedBid = bidService.save(bid);
//        return ResponseEntity.ok(savedBid);
//    }
}
