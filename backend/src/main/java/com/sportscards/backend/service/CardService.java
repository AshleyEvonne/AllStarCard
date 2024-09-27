package com.sportscards.backend.service;


import com.sportscards.backend.common.CardRepository;
import com.sportscards.backend.model.Card;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CardService {
    @Autowired
    private CardRepository cardRepository;

    public List<Card> findAll(){
        return cardRepository.findAll();
    }
    public Card findById(Integer id){
        return cardRepository.findById(id).orElse(null);
        }
    public  Card save(Card card){
        return cardRepository.save(card);
    }
    public void deleteById(Integer id){
        cardRepository.deleteById(id);
    }
//    public List<Card> findByType(){
//        return cardRepository.findByType();
//    }
}

