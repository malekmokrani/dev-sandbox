# MoviesBlog

Utilise l'API https://rapidapi.com/SAdrian/api/moviesdatabase pour lister et afficher les informations disponible.
Possible de créer un compte et laisser un commentaire sur la page du film.


Symfony 6.3, twig, bootstrap

## Variables d'environement (.env ou env.local)
    DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/moviesblog"
    ###> symfony/mailer ex : gmail+smtp://USERNAME:APP-PASSWORD@default ###
    MAILER_DSN=
    #### Expediteur 
    EMAIL_APP=
    ####  rapidapi 
    X_RAPIDAPI_KEY=

## Installation

    composer install
    php bin/console doctrine:database:create
    php bin/console make:migrations
    php bin/console doctrine:migrations:migrate

  
