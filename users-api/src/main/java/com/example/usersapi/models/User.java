package com.example.usersapi.models;

import lombok.*;
import org.hibernate.validator.constraints.Email;

import javax.persistence.*;
import java.util.List;

@Data
@AllArgsConstructor @NoArgsConstructor @Getter @Setter
@Entity @Table(name = "USERS")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "USER_ID")
    private Long userId;

    @Email
    @Column(name = "EMAIL")
    private String email;

    @Column(name = "FULL_NAME")
    private String fullName;

    //    @JsonIgnore
    @OneToMany
    @JoinColumn(name = "USER_ID")
    private List<Favorite> favorites;

    public User(String email, String fullName) {
        this.email = email;
        this.fullName = fullName;
    }

    public User(String email, String fullName, List<Favorite> favorites) {
        this.email = email;
        this.fullName = fullName;
        this.favorites = favorites;
    }
}