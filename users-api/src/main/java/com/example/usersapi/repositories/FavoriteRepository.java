package com.example.usersapi.repositories;

import com.example.usersapi.models.Favorite;
import org.springframework.data.repository.CrudRepository;

public interface FavoriteRepository extends CrudRepository<Favorite, Long> {

}
