package com.example.demo.config;

import com.example.demo.dao.Person;
import com.example.demo.repository.PersonsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.logging.Logger;

@Component
public class DataLoader implements CommandLineRunner {

    private static final Logger log = Logger.getLogger(DataLoader.class.getName());

    @Autowired
    private PersonsRepository repository;

    @Override
    public void run(String... args) throws Exception {
        // Zapisz kilka osób do bazy danych
        repository.save(new Person("John", "Doe", "IT"));
        repository.save(new Person("John", "Smith", "Tester"));

        // Pobierz wszystkich użytkowników i wyświetl ich w logach
        log.info("Persons found with findAll():");
        log.info("-------------------------------");
        repository.findAll().forEach(person -> {
            log.info(person.toString());
        });
    }
}