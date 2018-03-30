package com.example.brooklynmuseum.repositories;

import com.example.brooklynmuseum.models.Favorite;
import org.springframework.data.repository.CrudRepository;

public interface FavoriteRepository extends CrudRepository<Favorite, Long> {

}