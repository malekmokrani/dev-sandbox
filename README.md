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

L'api Spring est accessible via les endpoints

    http://localhost:8080/api/search/{keywords}
    http://localhost:8080/api/movie/{id}


## clientAngular
https://github.com/malekmokrani/dev-sandbox/tree/main/clientAngular

Frontend Angular RxJS (la mise en page est minimaliste, .. todo)

  ng serve

veillez à ce que le backend spring soit accessible (port 8080 : changement de port dans le fichiers de configuration [repertoire environement](https://github.com/malekmokrani/dev-sandbox/tree/main/clientAngular/src/environments))
  

## clientReactJS
https://github.com/malekmokrani/dev-sandbox/tree/main/clientReactJS

Frontend ReactJS Bootstrap la mise en page est minimaliste, .. todo)

  npm start


## Le répertoire symfony 
https://github.com/malekmokrani/dev-sandbox/tree/main/Symfony

Utilise l'API https://rapidapi.com/SAdrian/api/moviesdatabase pour lister et afficher les informations disponible. Possible de créer un compte et laisser un commentaire sur la page du film.

Symfony 6.3, twig, bootstrap

Variables d'environement (.env ou env.local)

    DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/moviesblog"
    ###> symfony/mailer ex : gmail+smtp://USERNAME:APP-PASSWORD@default ###
    MAILER_DSN=
    #### Expediteur 
    EMAIL_APP=
    ####  rapidapi 
    X_RAPIDAPI_KEY=
    
Installation

    composer install
    php bin/console doctrine:database:create
    php bin/console make:migrations
    php bin/console doctrine:migrations:migrate


## WarMarket (Archive 2022)
https://github.com/malekmokrani/dev-sandbox/tree/main/M2i_incubateur

Backend Spring DBB postgres, frontend reactJS reduce tailwind css

