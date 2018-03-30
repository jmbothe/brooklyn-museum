package com.example.brooklynmuseum.features;

import com.example.brooklynmuseum.models.Favorite;
import com.example.brooklynmuseum.models.User;
import com.example.brooklynmuseum.repositories.FavoriteRepository;
import com.example.brooklynmuseum.repositories.UserRepository;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.stream.Stream;

import static io.restassured.RestAssured.given;
import static io.restassured.RestAssured.when;
import static io.restassured.http.ContentType.JSON;
import static org.hamcrest.CoreMatchers.containsString;
import static org.hamcrest.core.Is.is;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
public class UsersApiFeatureTest {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FavoriteRepository favoriteRepository;

    @Before
    public void setUp() {
        userRepository.deleteAll();
        favoriteRepository.deleteAll();
    }

    @After
    public void tearDown() {
        userRepository.deleteAll();
        favoriteRepository.deleteAll();
    }

    @Test
    public void shouldAllowFullCrudForAUser() throws Exception {

        User firstUser = new User(
            "first@gmail.com",
            "Joe Schmoe"
        );

        User secondUser = new User(
            "second@gmail.com",
            "Jane Doe"
        );

        Stream.of(firstUser, secondUser)
            .forEach(user -> {
                userRepository.save(user);
            });

        Favorite firstUserFirstFav = new Favorite(1L, 12345L);
        Favorite firstUserSecondFav = new Favorite(1L, 56789L);
        Favorite secondUserFirstFav = new Favorite(2L, 54321L);
        Favorite secondUserSecondFav = new Favorite(2L, 98765L);

        Stream.of(firstUserFirstFav, firstUserSecondFav, secondUserFirstFav, secondUserSecondFav)
                .forEach(fav -> {
                    favoriteRepository.save(fav);
                });

        // Test get all Users
        when()
            .get("http://localhost:8080/users/get-all-users/")
        .then()
            .statusCode(is(200))
            .and().body(containsString("first@gmail.com"))
            .and().body(containsString("Jane Doe"))
                .and().body(containsString("12345"))
                .and().body(containsString("98765"));

        // Test creating a User
        User userNotYetInDb = new User(
            "third@gmail.com",
                "Jim Jones"
        );

        given()
            .contentType(JSON)
            .and().body(userNotYetInDb)
        .when()
            .post("http://localhost:8080/users/add-user/")
        .then()
            .statusCode(is(200))
            .and().body(containsString("third@gmail.com"));

        // Test finding one user by ID
        when()
            .get("http://localhost:8080/users/get-user/" + secondUser.getUserId())
        .then()
            .statusCode(is(200))
            .and().body(containsString("second@gmail.com"))
            .and().body(containsString("Jane Doe"))
                .and().body(containsString("54321"));

        // Test updating a user
        secondUser.setFullName("Sally Joe");

        given()
            .contentType(JSON)
            .and().body(secondUser)
        .when()
            .patch("http://localhost:8080/users/update-user/" + secondUser.getUserId())
        .then()
            .statusCode(is(200))
            .and().body(containsString("Sally Joe"));

        // Test deleting a user
        when()
            .delete("http://localhost:8080/users/delete-user/" + secondUser.getUserId())
        .then()
            .statusCode(is(200));
    }

    @Test
    public void shouldAllowPartialCrudForFavorites() throws Exception {

        Favorite newFav = new Favorite(1L, 2468L);
        favoriteRepository.save(newFav);

        // Test deleting a Favorite
        when()
            .delete("http://localhost:8080/users/delete-favorite/" + newFav.getFavoriteId())
        .then()
            .statusCode(is(200));

        // Test creating a Favorite

        Favorite favoriteNotYetInDb = new Favorite(1L, 76543L);
        System.out.println(favoriteNotYetInDb.getFavoriteId());

        given()
            .contentType(JSON)
            .and().body(favoriteNotYetInDb)
        .when()
            .post("http://localhost:8080/users/add-favorite/")
        .then()
            .statusCode(is(200))
            .and().body(containsString("76543"));
    }
}