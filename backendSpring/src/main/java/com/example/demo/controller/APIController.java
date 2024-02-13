package com.example.demo.controller;

import com.example.demo.model.Movie;
import com.example.demo.model.ResultAPI;
import com.example.demo.service.HTTPService;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;


@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api")
public class APIController {
    private final HTTPService service;
    public APIController(HTTPService service) {
        this.service = service;
    }

    @GetMapping("/movie/{id}")
    public Mono<Movie> getMovie(@PathVariable String id) {
        return this.service.movieByID(id);
    }

    @GetMapping("/search/{keywords}")
    public Mono<ResultAPI> getResultPage(@PathVariable String keywords, String page) {
        return this.service.searchByKeywords(keywords , page);
    }

}
