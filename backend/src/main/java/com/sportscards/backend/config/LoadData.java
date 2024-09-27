package com.sportscards.backend.config;


import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import com.sportscards.backend.common.CardRepository;
import com.sportscards.backend.model.Card;
import org.slf4j.Logger;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@Configuration
public class LoadData implements CommandLineRunner {

    private final Logger logger = org.slf4j.LoggerFactory.getLogger(LoadData.class);
    private final CardRepository cardRepository;

    final ObjectMapper objectMapper;

    public LoadData(CardRepository cardRepository, ObjectMapper objectMapper) {
        this.cardRepository = cardRepository;
        this.objectMapper = objectMapper;
    }


    @Override
    public void run(String... args) throws Exception {
        loadCard();

    }

    //Method to upload data from the ESLData json file
    private void loadCard() {
        ObjectMapper mapper = new ObjectMapper();
        TypeReference<List<Card>> typeReference = new TypeReference<List<Card>>() {
        };
        InputStream inputStream = null;
        try {
            inputStream = new ClassPathResource("/data/Card.json").getInputStream();
            List<Card> cards = mapper.readValue(inputStream, typeReference);
            cardRepository.saveAll(cards);
            logger.info("Cards loaded successfully.");
        } catch (IOException e) {
            logger.error("Unable to load Cards: " + e.getMessage());
        } finally {
            if (inputStream != null) {
                try {
                    inputStream.close();
                } catch (IOException e) {
                    logger.error("Unable to close input stream: " + e.getMessage());
                }
            }
        }
    }

}
