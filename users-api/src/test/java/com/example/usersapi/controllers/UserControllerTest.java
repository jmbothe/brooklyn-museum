package com.example.usersapi.controllers;

import com.example.usersapi.models.Favorite;
import com.example.usersapi.models.User;
import com.example.usersapi.repositories.FavoriteRepository;
import com.example.usersapi.repositories.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static org.hamcrest.CoreMatchers.containsString;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.hasSize;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doAnswer;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest(UserController.class)
public class UserControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserRepository mockUserRepository;

    @MockBean
    private FavoriteRepository mockFavoriteRepository;

    @Autowired
    private ObjectMapper jsonObjectMapper;

    private User newUser;
    private User updatedSecondUser;
    private Favorite newFavorite;

    @Before
    public void setUp() {

        Favorite firstUserFirstFav = new Favorite(1L, 12345L);
        Favorite firstUserSecondFav = new Favorite(1L, 56789L);
        Favorite secondUserFirstFav = new Favorite(2L, 54321L);
        Favorite secondUserSecondFav = new Favorite(2L, 98765L);

        List<Favorite> firstUserFavs =
                Stream.of(firstUserFirstFav, firstUserSecondFav).collect(Collectors.toList());

        List<Favorite> secondUserFavs =
                Stream.of(secondUserFirstFav, secondUserSecondFav).collect(Collectors.toList());

        User firstUser = new User(
                "first@gmail.com",
                "Joe Schmoe",
                firstUserFavs
        );

        User secondUser = new User(
                "second@gmail.com",
                "Jane Doe",
                secondUserFavs
        );

        Iterable<User> mockUsers =
            Stream.of(firstUser, secondUser).collect(Collectors.toList());

        given(mockUserRepository.findAll()).willReturn(mockUsers);
        given(mockUserRepository.findOne(1L)).willReturn(firstUser);
        given(mockUserRepository.findOne(4L)).willReturn(null);

        // Mock out Delete to return EmptyResultDataAccessException for missing user with ID of 4
        doAnswer(invocation -> {
            throw new EmptyResultDataAccessException("ERROR MESSAGE FROM MOCK!!!", 1234);
        }).when(mockUserRepository).delete(4L);

        doAnswer(invocation -> {
            throw new EmptyResultDataAccessException("ERROR MESSAGE FROM MOCK!!!", 1234);
        }).when(mockFavoriteRepository).delete(6L);

        newUser = new User(
            "third@gmail.com",
            "Sally Joe"
        );
        given(mockUserRepository.save(newUser)).willReturn(newUser);

        updatedSecondUser = new User(
            "new@gmail.com",
                "Joey Sal"
        );
        given(mockUserRepository.save(updatedSecondUser)).willReturn(updatedSecondUser);

        newFavorite = new Favorite(1L, 45678L);
        given(mockFavoriteRepository.save(newFavorite)).willReturn(newFavorite);
    }

    //TEST GET all users

    @Test
    public void findAllUsers_success_returnsStatusOK() throws Exception {

        this.mockMvc
            .perform(get("/get-all-users/"))
            .andExpect(status().isOk());
    }

    @Test
    public void findAllUsers_success_returnAllUsersAsJSON() throws Exception {

        this.mockMvc
            .perform(get("/get-all-users/"))
            .andExpect(jsonPath("$", hasSize(2)));
    }

    @Test
    public void findAllUsers_success_returnEmailForEachUser() throws Exception {

        this.mockMvc
            .perform(get("/get-all-users/"))
            .andExpect(jsonPath("$[0].email", is("first@gmail.com")));
    }

    @Test
    public void findAllUsers_success_returnNameForEachUser() throws Exception {

        this.mockMvc
            .perform(get("/get-all-users/"))
            .andExpect(jsonPath("$[0].fullName", is("Joe Schmoe")));
    }

    @Test
    public void findAllUsers_success_returnFavoritesForEachUser() throws Exception {

        this.mockMvc
            .perform(get("/get-all-users/"))
            .andExpect(jsonPath("$[0].favorites", hasSize(2)));
    }

    //TEST GET user by ID, Happy path

    @Test
    public void findUserById_success_returnsStatusOK() throws Exception {

        this.mockMvc
            .perform(get("/get-user/1"))
            .andExpect(status().isOk());
    }

    @Test
    public void findUserById_success_returnEmail() throws Exception {

        this.mockMvc
            .perform(get("/get-user/1"))
            .andExpect(jsonPath("$.email", is("first@gmail.com")));
    }

    @Test
    public void findUserById_success_returnName() throws Exception {

        this.mockMvc
            .perform(get("/get-user/1"))
            .andExpect(jsonPath("$.fullName", is("Joe Schmoe")));
    }

    @Test
    public void findUserById_success_returnFavorites() throws Exception {

        this.mockMvc
            .perform(get("/get-user/1"))
            .andExpect(jsonPath("$.favorites[0].objectId", is(12345)));
    }

    //TEST GET user by ID, unhappy path

    @Test
    public void findUserById_failure_userNotFoundReturns404() throws Exception {

        this.mockMvc
            .perform(get("/get-user/4"))
            .andExpect(status().isNotFound());
    }

    @Test
    public void findUserById_failure_userNotFoundReturnsNotFoundErrorMessage() throws Exception {

        this.mockMvc
            .perform(get("/get-user/4"))
            .andExpect(status().reason(containsString("User with ID of 4 was not found!")));
    }

    //TEST DELETE by ID route - happy path

    @Test
    public void deleteUserById_success_returnsStatusOk() throws Exception {

        this.mockMvc
                .perform(delete("/delete-user/1"))
                .andExpect(status().isOk());
    }

    @Test
    public void deleteUserById_success_deletesViaRepository() throws Exception {

        this.mockMvc.perform(delete("/delete-user/1"));

        verify(mockUserRepository, times(1)).delete(1L);
    }

    //TEST DELETE by ID route - unhappy path

    @Test
    public void deleteUserById_failure_userNotFoundReturns404() throws Exception {

        this.mockMvc
            .perform(delete("/delete-user/4"))
            .andExpect(status().isNotFound());
    }

    //TEST POST new user

    @Test
    public void createUser_success_returnsStatusOk() throws Exception {

        this.mockMvc
            .perform(
                post("/add-user/")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonObjectMapper.writeValueAsString(newUser))
            )
            .andExpect(status().isOk());
    }

    @Test
    public void createUser_success_returnsEmail() throws Exception {

        this.mockMvc
            .perform(
                post("/add-user/")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(jsonObjectMapper.writeValueAsString(newUser))
            )
            .andExpect(jsonPath("$.email", is("third@gmail.com")));
    }

    @Test
    public void createUser_success_returnsName() throws Exception {

        this.mockMvc
            .perform(
                post("/add-user/")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(jsonObjectMapper.writeValueAsString(newUser))
            )
            .andExpect(jsonPath("$.fullName", is("Sally Joe")));
    }

    @Test
    public void createUser_success_returnFavorites() throws Exception {

        this.mockMvc
            .perform(get("/add-user/"))
            .andExpect(jsonPath("$.favorites").doesNotExist());
    }

    //TEST PATCH user

    @Test
    public void updateUserById_success_returnsStatusOk() throws Exception {

        this.mockMvc
            .perform(
                patch("/update-user/1")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(jsonObjectMapper.writeValueAsString(updatedSecondUser))
            )
            .andExpect(status().isOk());
    }

    @Test
    public void updateUserById_success_returnsUpdatedEmail() throws Exception {

        this.mockMvc
            .perform(
                patch("/update-user/1")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(jsonObjectMapper.writeValueAsString(updatedSecondUser))
            )
            .andExpect(jsonPath("$.email", is("new@gmail.com")));
    }

    @Test
    public void updateUserById_success_returnsUpdatedName() throws Exception {

        this.mockMvc
            .perform(
                patch("/update-user/1")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(jsonObjectMapper.writeValueAsString(updatedSecondUser))
            )
            .andExpect(jsonPath("$.fullName", is("Joey Sal")));
    }

    //TEST PATCH user - unhappy path

    @Test
    public void updateUserById_failure_userNotFoundReturns404() throws Exception {

        this.mockMvc
                .perform(
                    patch("/update-user/4")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonObjectMapper.writeValueAsString(updatedSecondUser))
            )
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateUserById_failure_userNotFoundReturnsNotFoundErrorMessage() throws Exception {

        this.mockMvc
            .perform(
                patch("/update-user/4")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(jsonObjectMapper.writeValueAsString(updatedSecondUser))
            )
        .andExpect(status().reason(containsString("User with ID of 4 was not found!")));
    }

    // TEST POST new Favorite

    @Test
    public void createFavorite_success_returnsStatusOk() throws Exception {

        this.mockMvc
            .perform(
                post("/add-favorite/")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(jsonObjectMapper.writeValueAsString(newFavorite))
            )
            .andExpect(status().isOk());
    }

    @Test
    public void createFavorite_success_returnsUserId() throws Exception {

        this.mockMvc
            .perform(
                post("/add-favorite/")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(jsonObjectMapper.writeValueAsString(newFavorite))
            )
            .andExpect(jsonPath("$.userId", is(1)));
    }

    @Test
    public void createFavorite_success_returnsItemId() throws Exception {

        this.mockMvc
            .perform(
                post("/add-favorite/")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(jsonObjectMapper.writeValueAsString(newFavorite))
            )
            .andExpect(jsonPath("$.objectId", is(45678)));
    }

    //TEST DELETE Favorite by ID - happy path

    @Test
    public void deleteFavoriteById_success_returnsStatusOk() throws Exception {

        this.mockMvc
                .perform(delete("/delete-favorite/1"))
                .andExpect(status().isOk());
    }

    @Test
    public void deleteFavoriteById_success_deletesViaRepository() throws Exception {

        this.mockMvc.perform(delete("/delete-favorite/1"));

        verify(mockFavoriteRepository, times(1)).delete(1L);
    }

    //TEST DELETE favorite by ID - unhappy path

    @Test
    public void deleteFavoriteById_failure_userNotFoundReturns404() throws Exception {

        this.mockMvc
            .perform(delete("/delete-favorite/6"))
            .andExpect(status().isNotFound());
    }

}