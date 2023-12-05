package com.example.demo.repository;

import com.example.demo.dao.Person;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface PersonsRepository extends CrudRepository<Person, Long> {
    List<Person> findBySurname(String surname);
}