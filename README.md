# dev-sandbox

Ce dépot contient des projets récents urilisant l'API du themoviedb qui propose de nombreuses fonctionnalités pour accéder à des informations et des ressources liées aux films, aux séries TV, aux acteurs et aux actrices.

## themoviedb API 
### [themoviedb.com API ](http://developer.themoviedb.org "themoviedb API ")




## backendSpring
**backend Spring-boot Reactor**, essai de mise en oeuvre de la programmation réactive.
Application basic permettant d'effectuer des recherches d'informations par mots cles sur un film.

### Usage
l'Application embarque un build du front angular, elle permet également d'accédé au endpoint via un server de developement Angular ou ReactJS

le fichier application.properties doit renseigner le token d'acces à l'API

`TMDB.token= <ACCESS_TOKEN>`


    ./mvnw spring-boot:run

Le client Angular est dispo à l'adresse suivante : http://localhost:8080,  http://localhost:8080/movie/123

L'api Spring via les endpoints 

    http://localhost:8080/api/search/{keywords}
    http://localhost:8080/api/movie/{id}


## clientAngular
Frontend Angular RxJS (la mise en page est minimaliste, .. todo)

  ng serve

## clientReactJS
Frontend ReactJS Bootstrap la mise en page est minimaliste, .. todo)

  npm start
