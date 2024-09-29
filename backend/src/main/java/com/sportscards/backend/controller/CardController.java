package com.sportscards.backend.controller;


import com.sportscards.backend.common.CardRepository;
import com.sportscards.backend.model.Bid;
import com.sportscards.backend.model.Card;
import com.sportscards.backend.service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

//import java.lang.classfile.ClassFile.Option;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/cards")
public class CardController {
    @Autowired
    private CardService cardService;
    private CardRepository cardRepository;

    ///USERS ACCESS THESE ROUTES
    @GetMapping("/all")
    public List<Card> getAllCards(){
        return cardService.findAll();
    }

    @GetMapping("/{id}")
    public Card getCard(@PathVariable Integer id){
        return cardService.findById(id);
    }


    @PutMapping("/addBid/{userId}/{cardId}")
    public ResponseEntity<?> addBidToCard(@PathVariable Integer userId, @PathVariable Integer cardId, @RequestBody Bid newBid) {

        Optional<Bid> bidUpdated = cardService.addBidToCard(userId, cardId, newBid);

        if(bidUpdated.isPresent()) {
            return ResponseEntity.ok().body(bidUpdated.get());
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Bid, card, or user not found.");
    }



    //ADMIN ACCESS THESE ROUTES

    @PostMapping Card createCard(@RequestBody Card card){
        return cardService.save(card);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCard(@PathVariable Integer id){
        cardService.deleteById(id);
        return ResponseEntity.noContent().build();
    }


}