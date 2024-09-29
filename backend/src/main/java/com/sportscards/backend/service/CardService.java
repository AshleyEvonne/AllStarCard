package com.sportscards.backend.service;

import com.sportscards.backend.common.BidRepository;
import com.sportscards.backend.common.CardRepository;
import com.sportscards.backend.common.UserRepository;
import com.sportscards.backend.model.Bid;
import com.sportscards.backend.model.Card;
import com.sportscards.backend.model.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

//import java.lang.classfile.ClassFile.Option;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CardService {
    @Autowired
    private CardRepository cardRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BidRepository bidRepository;

    public List<Card> findAll() {
        return cardRepository.findAll();
    }

    public Card findById(Integer id) {
        return cardRepository.findById(id).orElse(null);
    }

    public Card save(Card card) {
        return cardRepository.save(card);
    }

    public void deleteById(Integer id) {
        cardRepository.deleteById(id);
    }
    public Optional<Bid> addBidToCard(Integer userId, Integer cardId, Bid newBid) {

        // Find the user and card from repositories
        Optional<User> foundUser = userRepository.findById(userId);
        Optional<Card> foundCard = cardRepository.findById(cardId);

        // Check if the user and card exist
        if (foundUser.isPresent() && foundCard.isPresent()) {
            // Retrieve the existing bid by cardId and userId
            Optional<Bid> foundBid = bidRepository.findByCardId(cardId);

            // Update the existing bid if found
            if (foundBid.isPresent()) {
                Bid existingBid = foundBid.get();

                // Update both userId and amount if the new bid is from a different user
                existingBid.setUserId(userId);  // Update to the new user's ID
                existingBid.setAmount(newBid.getAmount());

                // Save and return the updated bid
                return Optional.of(bidRepository.save(existingBid));
            } else {
                // Create a new bid for the card if no bid is found
                Bid newBidForCard = new Bid();
                newBidForCard.setUserId(userId);  // Set the new userId
                newBidForCard.setCardId(cardId);  // Set the cardId
                newBidForCard.setAmount(newBid.getAmount());

                // Save and return the newly created bid
                return Optional.of(bidRepository.save(newBidForCard));
            }
        }

        // Return empty if user or card is not found
        return Optional.empty();
    }

    // Method to delete cards with bidTime older than 7 days and add trophies based on bids
    public void deleteOldCards() {
        LocalDateTime sevenDaysAgo = LocalDateTime.now().minusDays(7);

        // Find cards with old bid times
        List<Card> oldCards = cardRepository.findAllWithOldBidTimes(sevenDaysAgo);
        for (Card card : oldCards) {
            // Find the bid associated with the card
            Optional<Bid> bidOptional = bidRepository.findByCardId(card.getId());

            if (bidOptional.isPresent()) {
                Bid bid = bidOptional.get();
                Integer userId = bid.getUserId();  // Get the user who placed the bid

                // Find the user associated with the bid
                Optional<User> userOptional = userRepository.findById(userId);
                if (userOptional.isPresent()) {
                    User user = userOptional.get();

                    // Add the card to the user's trophyCards if it's not already there
                    if (!user.getTrophyCards().contains(card)) {
                        user.getTrophyCards().add(card);
                    }

                    // Save the updated user
                    userRepository.save(user);
                }
            }

            // Delete the card after processing the bid
            cardRepository.delete(card);
        }
    }

    // Service method to get all cards from all bids by a user
    public List<Card> getAllCardsFromUserBids(Integer userId) {
        // Get all bids placed by the user
        List<Bid> userBids = bidRepository.findByUserId(userId);

        // Extract cardIds from the bids and collect the corresponding cards
        List<Integer> cardIds = userBids.stream()
                .map(Bid::getCardId)
                .collect(Collectors.toList());

        // Fetch all cards by the extracted cardIds
        return cardRepository.findAllById(cardIds);
    }


}