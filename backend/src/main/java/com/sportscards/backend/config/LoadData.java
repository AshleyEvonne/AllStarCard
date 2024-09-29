package com.sportscards.backend.config;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sportscards.backend.common.CardRepository;
import com.sportscards.backend.common.UserRepository;
import com.sportscards.backend.model.Card;
import com.sportscards.backend.model.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.util.List;

@Configuration
public class LoadData implements CommandLineRunner {

    private final Logger logger = LoggerFactory.getLogger(LoadData.class);
    private final CardRepository cardRepository;
    private final UserRepository userRepository;
    private final ObjectMapper objectMapper;

    public LoadData(CardRepository cardRepository, UserRepository userRepository, ObjectMapper objectMapper) {
        this.cardRepository = cardRepository;
        this.userRepository = userRepository;
        this.objectMapper = objectMapper;
    }

    @Override
    public void run(String... args) throws Exception {
        loadCard();
        loadUser();  // Adding the method to load User data
    }

    // Method to load Card data from the JSON file
    private void loadCard() {
        ObjectMapper mapper = new ObjectMapper();
        TypeReference<List<Card>> typeReference = new TypeReference<List<Card>>() {};
        try (InputStream inputStream = new ClassPathResource("/data/Card.json").getInputStream()) {
            // Read the list of cards from JSON
            List<Card> cards = mapper.readValue(inputStream, typeReference);

            // Set bidTime for each card
            cards.forEach(card -> {
                // Set the bidTime to the current date and time, or a custom value
                card.setBidTime(LocalDateTime.now()); // You can customize this time if needed
            });

            // Save the modified cards to the repository
            cardRepository.saveAll(cards);
            logger.info("Cards loaded successfully with bidTime added.");
        } catch (IOException e) {
            logger.error("Unable to load Cards: " + e.getMessage());
        }
    }

    // Method to load User data from the JSON file
    private void loadUser() {
        ObjectMapper mapper = new ObjectMapper();
        TypeReference<List<User>> typeReference = new TypeReference<List<User>>() {
        };
        try (InputStream inputStream = new ClassPathResource("/data/User.json").getInputStream()) {
            List<User> users = mapper.readValue(inputStream, typeReference);
            userRepository.saveAll(users);
            logger.info("Users loaded successfully.");
        } catch (IOException e) {
            logger.error("Unable to load Users: " + e.getMessage());
        }
    }
}