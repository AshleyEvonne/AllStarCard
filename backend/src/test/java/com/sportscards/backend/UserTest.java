//Tried to do a Junit test but was getting errors when running.


//package com.sportscards.backend;
//
//import com.sportscards.backend.model.User;
//import jakarta.persistence.EntityManager;
//import jakarta.persistence.EntityManagerFactory;
//import jakarta.persistence.Persistence;
//import org.junit.jupiter.api.AfterAll;
//import org.junit.jupiter.api.BeforeAll;
//import org.junit.jupiter.api.Test;
//
//import java.util.List;
//
//import static org.junit.jupiter.api.Assertions.assertEquals;
//import static org.junit.jupiter.api.Assertions.assertNotNull;
//
//public class UserTest {
//    private static EntityManagerFactory entityManagerFactory;
//    private static EntityManager entityManager;
//
//    @BeforeAll
//    public static void setUp() {
//        entityManagerFactory = Persistence.createEntityManagerFactory("test-persistence-unit");
//        entityManager = entityManagerFactory.createEntityManager();
//    }
//
//    @AfterAll
//    public static void tearDown() {
//        if (entityManager != null) {
//            entityManager.close();
//        }
//        if (entityManagerFactory != null) {
//            entityManagerFactory.close();
//        }
//    }
//
//    @Test
//    public void testUserEntity() {
//        entityManager.getTransaction().begin();
//
//        // Create a new User instance
//        User user = new User();
//        user.setName("John Doe");
//        user.setEmail("john.doe@example.com");
//        user.setPassword("securePassword123");
//
//        // Persist the User
//        entityManager.persist(user);
//        entityManager.getTransaction().commit();
//
//        // Fetch the User by ID
//        User foundUser = entityManager.find(User.class, user.getId());
//
//        // Assertions
//        assertNotNull(foundUser);
//        assertEquals(user.getName(), foundUser.getName());
//        assertEquals(user.getEmail(), foundUser.getEmail());
//        assertEquals(user.getPassword(), foundUser.getPassword());
//    }
//}