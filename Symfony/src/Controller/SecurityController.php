<?php

namespace App\Controller;


use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

class SecurityController extends AbstractController
{
    #[Route('/signin', name: 'app_security_signin', methods:["POST", "GET"])]
    public function index(AuthenticationUtils $authUtils): Response
    {
        return $this->render('page/login.html.twig', [
                                                            'last_username' => $authUtils->getLastUsername(),
                                                            'error'=>$authUtils->getLastAuthenticationError()
                                                        ]);
    }

    #[Route('/logout', name:'app_security_logout')]
    public function logout(){ }

}
