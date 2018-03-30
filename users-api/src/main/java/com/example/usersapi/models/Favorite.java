package com.example.usersapi.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;

@Data
@AllArgsConstructor @NoArgsConstructor @Getter @Setter
@Entity @Table(name = "FAVORITES")
public class Favorite {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "FAVORITE_ID")
    private Long favoriteId;

    @Column(name = "USER_ID")
    private Long userId;

    @Column(name = "OBJECT_ID")
    private Long objectId;

    public Favorite(Long userId, Long objectId) {
        this.userId = userId;
        this.objectId = objectId;
    }
}