//Tried to do a Junit test but was getting errors when running.

package com.sportscards.backend;
import com.sportscards.backend.common.CardRepository;
import com.sportscards.backend.model.Card;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import java.time.LocalDateTime;
import java.util.List;


import static org.assertj.core.api.Assertions.assertThat;


import com.sportscards.backend.model.User;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;


public class Testing {
    private static EntityManagerFactory entityManagerFactory;
    private static EntityManager entityManager;

    @BeforeAll
    public static void setUp() {
        entityManagerFactory = Persistence.createEntityManagerFactory("test-persistence-unit");
        entityManager = entityManagerFactory.createEntityManager();
    }

    @AfterAll
    public static void tearDown() {
        if (entityManager != null) {
            entityManager.close();
        }
        if (entityManagerFactory != null) {
            entityManagerFactory.close();
        }
    }

    @Test
    public void testUserEntity() {
        entityManager.getTransaction().begin();

        // Create a new User instance
        User user = new User();
        user.setName("John Doe");
        user.setEmail("john.doe@example.com");
        user.setPassword("securePassword123");

        // Persist the User
        entityManager.persist(user);
        entityManager.getTransaction().commit();

        // Fetch the User by ID
        User foundUser = entityManager.find(User.class, user.getId());

        // Assertions
        assertNotNull(foundUser);
        assertEquals(user.getName(), foundUser.getName());
        assertEquals(user.getEmail(), foundUser.getEmail());
        assertEquals(user.getPassword(), foundUser.getPassword());
    }


    @Autowired
    private CardRepository cardRepository;

    @Test
    public void testFindByType() {
        // Given
        Card card1 = new Card();
        card1.setType("TypeA");
        entityManager.persist(card1);

        Card card2 = new Card();
        card2.setType("TypeB");
        entityManager.persist(card2);

        Card card3 = new Card();
        card3.setType("TypeA");
        entityManager.persist(card3);

        entityManager.flush();

        // When
        List<Card> foundCards = cardRepository.findByType("TypeA");

        // Then
        assertThat(foundCards).hasSize(2);
        assertThat(foundCards).extracting(Card::getType).containsOnly("TypeA");
    }

    @Test
    public void testFindAllWithOldBidTimes() {
        // Given
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime eightDaysAgo = now.minusDays(8);
        LocalDateTime sixDaysAgo = now.minusDays(6);

        Card oldCard1 = new Card();
        oldCard1.setBidTime(eightDaysAgo);
        entityManager.persist(oldCard1);

        Card oldCard2 = new Card();
        oldCard2.setBidTime(eightDaysAgo.plusHours(12));
        entityManager.persist(oldCard2);

        Card newCard = new Card();
        newCard.setBidTime(sixDaysAgo);
        entityManager.persist(newCard);

        entityManager.flush();

        // When
        List<Card> oldCards = cardRepository.findAllWithOldBidTimes(now.minusDays(7));

        // Then
        assertThat(oldCards).hasSize(2);
        assertThat(oldCards).extracting(Card::getBidTime)
                .allSatisfy(bidTime -> assertThat(bidTime).isBefore(now.minusDays(7)));
    }


}
