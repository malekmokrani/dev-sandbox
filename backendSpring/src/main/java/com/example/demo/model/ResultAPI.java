package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
@NoArgsConstructor
public class ResultAPI {
    @JsonProperty("page")
    private int page;
    @JsonProperty("total_pages")
    private int pageLength;
    @JsonProperty("total_results")
    private int nbrResult;
    public ArrayList<Object> getResult() {
        return results;
    }
    public void setResults(ArrayList<Object> results) {
        this.results = results;
    }

    private ArrayList<Object> results;

    public ResultAPI(ArrayList<Object> results) {

        this.results = results;
    }
}
