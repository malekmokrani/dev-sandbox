<?php

namespace App\service;

use App\Entity\User;
use App\Entity\Comments;
use App\Repository\CommentsRepository;
use Doctrine\ORM\EntityManagerInterface;


/**
* Le service CommentService d'acceder aux données de commentaires
*
* @author Malek <malek.mokrani[@]outlook.com>
*/

class CommentService{
    public function __construct(
                                    private EntityManagerInterface $manager, 
                                    private CommentsRepository $commentsRepository
                                ){}

    
    /**
     * @param string $imdb identifiant du film commenté
     * @param Comments $comment objet a sauvegarder en BDD
     * @param User $user commentateur
     */
    public function saveComments( string $imdb, Comments $comment, User $user)
    {
        
        $comment->setImdbID($imdb);
        $comment->setIdUser($user);
       
        $this->manager->persist($comment);
        $this->manager->flush();
        
    }

     /**
      * Permet de recuperer les commentaire posté pour un film donnée
     * @param string $imdb identifiant du film
     * @return array les commentaires laissés sur le film 
     */
    public function getComments(string $imdb): array
    {
        return $this->commentsRepository->findByMovie($imdb);
    }
        
}