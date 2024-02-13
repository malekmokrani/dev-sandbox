package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.ArrayList;

public class Movie {

    @JsonProperty("adult")
    private boolean adult;

    @JsonProperty("genres")
    private ArrayList<Object> genres;

    @JsonProperty("backdrop_path")
    private String backdrop_path;

    @JsonProperty("id")
    private int id;

    @JsonProperty("original_language")
    private String original_language;

    @JsonProperty("original_title")
    private String original_title;
    @JsonProperty("overview")
    private String overview;

    @JsonProperty("popularity")
    private float popularity;

    @JsonProperty("poster_path")
    private String poster_path;

    @JsonProperty("release_date")
    private String release_date;

    @JsonProperty("title")
    private String title;

    @JsonProperty("video")
    private boolean video;


    @JsonProperty("vote_count")
    private int vote_count;



    @JsonProperty("cast")
    private ArrayList<Object> cast;
    @JsonProperty("crew")
    private ArrayList<Object> crew;

    public Movie setCast(Credit credit) {
        this.cast = credit.getCast();
        return this;
    }
}
