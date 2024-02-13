package com.example.demo.service;

import com.example.demo.model.Credit;
import com.example.demo.model.Movie;
import com.example.demo.model.ResultAPI;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Slf4j
@Service
public class HTTPService {
    private String bearer;
    public HTTPService(@Value("${TMDB.token}") String token) {
        this.bearer = "Bearer " + token;
     }
    public Mono<Movie> movieByID(String id) {
        WebClient webClient = WebClient.create("https://api.themoviedb.org/3/movie/"+id+"/credits");

        return webClient.get()
                .header("Authorization", this.bearer)
                .accept(MediaType.APPLICATION_JSON)
                .retrieve().bodyToMono(Credit.class)
                .zipWhen(credit -> WebClient.create("https://api.themoviedb.org/3/movie/"+id).get()
                        .header("Authorization", this.bearer)
                        .accept(MediaType.APPLICATION_JSON)
                        .retrieve()
                        .bodyToMono(Movie.class), (credit, movie) -> movie.setCast(credit));
    }

    public Mono<ResultAPI> searchByKeywords(String keywords, String page) {
        WebClient webClient = WebClient.create("https://api.themoviedb.org/3/search/movie?language=en-US&page="+page+"&include_adult=false&query="+keywords);
        return webClient.get()
                .header("Authorization",  this.bearer)
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToMono(ResultAPI.class);


    }
}
