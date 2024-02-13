<?php

namespace App\service;


use Symfony\Component\HttpClient\HttpClient;
use Symfony\Contracts\HttpClient\ResponseInterface;
use Symfony\Contracts\HttpClient\HttpClientInterface;
/**
* Le service ClientAPI permet de gérer les appels a l'API moviesdatabase.
* Ces méthodes retourne le résultat des appels 
*
* @author Malek <malek.mokrani[@]outlook.com>
*/
class ClientAPI{
    
    private HttpClientInterface $client;
    public function __construct() {
        $this->client = HttpClient::create(['headers' => [
            'X-RapidAPI-Key' => $_ENV['X_RAPIDAPI_KEY'],
            'X-RapidAPI-Host' => 'moviesdatabase.p.rapidapi.com'
        ]]);
    }

    /**
     * Permet d'optenir les films qui sortirons prochainement
     * @throws TransportExceptionInterface
     * @return array tableau contenant 10 titres à venir 
     */
    public function getUpcoming():array
    {   
        return $this->request('https://moviesdatabase.p.rapidapi.com/titles/x/upcoming?info=custom_info')->toArray();
    }



    /**
     * @param string $query requets saisie par l'utilisateur
     * @throws TransportExceptionInterface
     * @return array tableau contenant 10 titres correspondant à la recherche effectuée
     */
    public function search($query):array
    {
        return $this->request('https://moviesdatabase.p.rapidapi.com/titles/search/keyword/'.$query)->toArray();
   
    }


    /**
     * @param string $imdb Identifiant imdb d'un titre
     * @throws TransportExceptionInterface
     * @return array tableau contenant les données associée au titres $imdb
     */
    public function getTitle($imdb):array
    {
     return $this->request('https://moviesdatabase.p.rapidapi.com/titles/'.$imdb.'?info=custom_info')->toArray();
    }

     /**
     * @param string $imdb Identifiant imdb d'un acteur
     * @throws TransportExceptionInterface
     * @return array tableau contenant les données associée à l'acteur $imdb
     */
    public function getActor($imdb):array
    {
       
     return $this->request('https://moviesdatabase.p.rapidapi.com/actors/'.$imdb)->toArray();
    }

    /**
     * @param array $actor tableu de resultat issue de la methode getActor($imdb)
     * @throws TransportExceptionInterface
     * @return array tableau contenant la filmographie de l'acteur
     */
    public function getFilmography($actor):array
    {
        $moviesID = $actor["results"]["knownForTitles"];
        return $this->request('https://moviesdatabase.p.rapidapi.com/titles/x/titles-by-ids?idsList='.$moviesID)->toArray();
    }
   

    /**
     * @param string $url
     * @param string $method='GET'
     * @throws TransportExceptionInterface
     * @return ResponseInterface
     */
    private function request( string $url, string $method='GET'):ResponseInterface
    {
        return $this->client->request($method, $url);
        
    }

    public static function getClient() {
        return HttpClient::create(['headers' => [
                'X-RapidAPI-Key' => $_ENV['X_RAPIDAPI_KEY'],
                'X-RapidAPI-Host' => 'moviesdatabase.p.rapidapi.com'
            ]]);
    }

}