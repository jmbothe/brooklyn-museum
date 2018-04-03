package com.example.usersapi.controllers;

import com.example.usersapi.models.Favorite;
import com.example.usersapi.models.User;
import com.example.usersapi.repositories.FavoriteRepository;
import com.example.usersapi.repositories.UserRepository;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FavoriteRepository favoriteRepository;


    @GetMapping("/get-all-users/")
    public Iterable<User> findAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/get-user/{id}")
    public User findUserById(@PathVariable Long id) throws NotFoundException {

        User foundUser = userRepository.findOne(id);

        if (foundUser == null) {
            throw new NotFoundException("User with ID of " + id + " was not found!");
        }

        return foundUser;
    }

    @GetMapping("/get-user-by-email/{email:.+}")
    @ResponseBody
    public User findUserByEmail(@PathVariable String email) throws NotFoundException {

        User foundUser = userRepository.findByEmail(email);

        if (foundUser == null) {
            throw new NotFoundException("User with Email of " + email + " was not found!");
        }

        return foundUser;
    }

    @DeleteMapping("/delete-user/{id}")
    public HttpStatus deleteUserById(@PathVariable Long id) throws EmptyResultDataAccessException {

        userRepository.delete(id);
        return HttpStatus.OK;
    }

    @PostMapping("/add-user/")
    public User createNewUser(@RequestBody User newUser) {
        return userRepository.save(newUser);
    }

    @PatchMapping("/update-user/{id}")
    public User updateUserById(@PathVariable Long id, @RequestBody User userRequest) throws NotFoundException {
        User userFromDb = userRepository.findOne(id);

        if (userFromDb == null) {
            throw new NotFoundException("User with ID of " + id + " was not found!");
        }

        userFromDb.setEmail(userRequest.getEmail());
        userFromDb.setFullName(userRequest.getFullName());
        userFromDb.setFavorites(userRequest.getFavorites());

        return userRepository.save(userFromDb);
    }

    @GetMapping("/get-recommendations/{objectId}")
    @ResponseBody
    public List<Long> getRecommendations(@PathVariable Long objectId) throws NotFoundException {
        HashMap<Long, Long> objectIds = new HashMap<>();

        Iterable<User> allUsers = userRepository.findAll();

        List<User> usersWhoLiked = StreamSupport.stream(allUsers.spliterator(), false)
            .filter(user -> user.getFavorites().stream().filter(fav -> fav.getObjectId().equals(objectId)).findFirst().isPresent())
            .collect(Collectors.toList());

        for (User user : usersWhoLiked) {
            for (Favorite fav : user.getFavorites()) {
                if (fav.getObjectId() != objectId) {
                    if (objectIds.containsKey(fav.getObjectId())) {
                        objectIds.compute(fav.getObjectId(), (k, v) -> v + 1);
                    } else {
                        objectIds.put(fav.getObjectId(), 0L);
                    }
                }

            }
        }

        return objectIds.entrySet().stream()
                .sorted(Map.Entry.comparingByValue())
                .map(obj -> obj.getKey())
                .limit(10)
                .collect(Collectors.toList());
    }

    @PostMapping("/add-favorite/")
    public Favorite createNewFavorite(@RequestBody Favorite newFavorite) {
        return favoriteRepository.save(newFavorite);
    }

    @DeleteMapping("/delete-favorite/{id}")
    public HttpStatus deleteFavoriteById(@PathVariable Long id) throws EmptyResultDataAccessException {

        favoriteRepository.delete(id);
        return HttpStatus.OK;
    }

    //EXCEPTION HANDLERS

    @ExceptionHandler
    void handleUserNotFound(
            NotFoundException exception,
            HttpServletResponse response) throws IOException {

        response.sendError(HttpStatus.NOT_FOUND.value(), exception.getMessage());
    }

    @ExceptionHandler
    void handleDeleteNotFoundException(
            EmptyResultDataAccessException exception,
            HttpServletResponse response) throws IOException {

        response.sendError(HttpStatus.NOT_FOUND.value());
    }
}
