<?php

namespace App\service;

use App\Entity\User;

use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;


/**
* Le service UserService permet d'enregistrer les utilisateurs en base de données
*
* @author Malek <malek.mokrani[@]outlook.com>
*/

class UserService{
    public function __construct(
                                    private EntityManagerInterface $manager, 
                                    private UserRepository $commentsRepository,
                                    private UserPasswordHasherInterface $hasher
                                ){}

    public function recordUser( User $user, mixed $data)
    {
        
        
        $user->setRoles(['ROLE_USER']);
        $user->setPassword($this->hasher->hashpassword($user, $user->getPassword()));
        $this->manager->persist($user);
        $this->manager->flush();
        
    }


        
}