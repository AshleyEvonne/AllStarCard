package com.sportscards.backend.controller;


import com.sportscards.backend.common.CardRepository;
import com.sportscards.backend.model.Card;
import com.sportscards.backend.service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/cards")
public class CardController {
    @Autowired
    private CardService cardService;
    private CardRepository cardRepository;

    @GetMapping("/all")
    public List<Card> getAllCards(){
        return cardService.findAll();
    }

    @GetMapping("/{id}")
    public Card getCard(@PathVariable Integer id){
        return cardService.findById(id);
    }

    @PostMapping Card createCard(@RequestBody Card card){
        return cardService.save(card);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCard(@PathVariable Integer id){
        cardService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
//    @GetMapping("/{type}")
//    Card getCardByType(@PathVariable String type){
//        List<Card> card = cardRepository.findByType(type);
//        if(car)
//        return card.get();
//    }

}
