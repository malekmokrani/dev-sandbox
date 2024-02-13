package com.example.demo.controller;


import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;
@Slf4j
@Controller 
public class MainController {


    @GetMapping(path = "/")
    public String homepage() {

        return "index";
    }

       @GetMapping(path = "/movie/{id}")
    public String movieDetails() {

        return "index";
    }



}