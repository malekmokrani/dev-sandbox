package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Actor {
         @JsonProperty("adult")
        private boolean adult;
         @JsonProperty("cast_id")
        private int cast_id;
        @JsonProperty("character")private String character;
        @JsonProperty("id")private int id;
        @JsonProperty("known_for_department")private String known_for_department;
        @JsonProperty("name")private String name;
        @JsonProperty("popularity")private int  popularity;
        @JsonProperty("profile_path")private String profile_path;

}
