package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class Credit {
    @JsonProperty("id")
    private int id;

    @JsonProperty("cast")
    private ArrayList<Object> cast;
    @JsonProperty("crew")
    private ArrayList<Object> crew;

}
