package com.example.brooklynmuseum.repositories;

import com.example.brooklynmuseum.models.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {

}