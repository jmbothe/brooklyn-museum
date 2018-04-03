package com.example.usersapi.repositories;

import com.example.usersapi.models.Favorite;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface FavoriteRepository extends CrudRepository<Favorite, Long> {
    List<Favorite> findByObjectId(Long objectId);
    List<Favorite> findByUserId(Long userId);
}
