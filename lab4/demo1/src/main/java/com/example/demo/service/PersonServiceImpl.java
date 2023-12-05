package com.example.demo.service;

import com.example.demo.dao.Person;
import com.example.demo.repository.PersonsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class PersonServiceImpl implements PersonService {

    @Autowired
    private PersonsRepository personsRepository;

    @Override
    public List<Person> getPersons() {
        return (List<Person>) personsRepository.findAll();
    }

    public Person getPerson(String surname) {
        List<Person> persons = personsRepository.findBySurname(surname);

        if (!persons.isEmpty()) {
            return persons.get(0);
        } else {
            throw new NoSuchElementException("Person not found with surname: " + surname);
        }
    }

    @Override
    public Person create(Person person) {
        return personsRepository.save(person);
    }

    @Override
    public Person getPerson(Long id) {
        return personsRepository.findById(id).orElse(null);
    }
}
