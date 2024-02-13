<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\Comments;
use App\Form\CommentType;
use App\Form\RegisterType;
use App\Event\RegistrationEvent;

use App\service\ClientAPI;
use App\service\CommentService;
use App\service\UserService;

use Psr\Log\LoggerInterface;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;


class MainController extends AbstractController
{

    public function __construct(
                               
                                private Security $security,
                                private UserService $userService,
                                private EventDispatcherInterface $dispatcher,
                                private ClientAPI $client,
                                private CommentService $commentService,
                                private LoggerInterface $log
    ) {
        
    }


    /** 
     *  HomePage
     *      La vue de la homepage avec en parametre un tableau 
     *      contenant les titres qui sortirons bientôt
     */
    #[Route('/', name: 'app_index')]
    public function index(): Response
    {
        $upcoming = $this->client->getUpcoming();

        return $this->render('page/index.html.twig', [ 'upcoming' => $upcoming]);
    }

     /**
     *  Page de résultat de recherche
     *          retourne la vue avec le tableau de résultat de la recherche 
     *          qui sera parsé dans le template  
     */
    #[Route('/search', name: 'app_search', methods:["GET"])]
    public function search(Request $request): Response
    {

        $query= $request->get('query'); 
        $data = ["results"=>[]];
        
        if($query!=null)$data= $this->client->search($query); 
        

        return $this->render('page/search.html.twig', [ 'search' => $data ]);
    }



    /*
    *   Page d'informations sur un titre
    *       
    */

    #[Route('/title/{imdb}', name: 'app_main_title')]
    public function getTitle(Request $request , string $imdb): Response
    {
        $title= $this->client->getTitle($imdb); 
        $comment = new Comments();
        $form = $this->createForm(CommentType::class,  $comment);
        if($request->getMethod()=="POST")
        {
            $form->handleRequest($request);
            if ($form->isSubmitted() && $form->isValid()) {
                $this->commentService->saveComments($imdb, $comment , $this->security->getUser());
                $form = $this->createForm(CommentType::class,  new Comments());
            }
        }


        $comments =  $this->commentService->getComments($imdb);
  
        return $this->render('page/title.html.twig', [
            'custom_info'=>$title,
            'comments'=> $comments,
            'form' => $form->createView()
        ]);
    }

    /*
    *   Page d'informations sur acteur
    */
    #[Route('/actors/{imdb}', name: 'app_main_actor')]
    public function getActor(string $imdb): Response
    {
        $actor= $this->client->getActor($imdb); 
        $movies = $this->client->getFilmography($actor);
        
        return $this->render('page/actor.html.twig', [
            'actor_info'=>$actor,
            'movies'=>$movies
        ]);
    }

    #[Route('/signup', name: 'app_main_signup', methods: ['GET','POST'])]
    public function signup( Request $request): Response
    {
      
        $user = new User();
        $form = $this->createForm(RegisterType::class, $user );
       

        $error = null;
        if($request->getMethod()=="POST")
        {
            $form->handleRequest($request);
            if ($form->isSubmitted() && $form->isValid()) {
                
          
               
                try {
                   
                    $this->userService->recordUser($user, $form->getData());
                    $this->addFlash(
                        'success',
                        'Vous pouvez vous connecter'
                    );
                 
                    $userEvent = new RegistrationEvent($user);
    
                    $this->dispatcher->dispatch($userEvent, RegistrationEvent::USER_CREATED_EVENT);
    
        
                    return $this->redirectToRoute('app_security_signin');
                } catch (\Throwable $th) {
                    //throw $th;
                    $this->log->error("signup " . $th->getMessage());
                 
                    if($th->getCode()==1062)$error=$user->getEmail() . " : Cette adresse est déja enregistrée"; 
                    else $error="Une erreur c'est produite lors de l'enregistrement";   
                }
            }
        }
        
        return $this->render('page/register.html.twig', [
            'form' => $form->createView(),
            'error'=>$error
        ]);
    }
}
