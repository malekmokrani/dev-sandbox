<?php

namespace App\EventSubscriber;

use App\service\MailService;
use Psr\Log\LoggerInterface;
use App\Event\RegistrationEvent;
use Symfony\Component\Mime\Email;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class UserSubscriber implements EventSubscriberInterface
{


    public function __construct(private LoggerInterface $log,  
                                private  MailService $mailService)
    {}

    public static function getSubscribedEvents():array
    {
        return [    RegistrationEvent::USER_CREATED_EVENT => [ "onUserRegistred" , 5000 ] ];
    }


    public function onUserRegistred(RegistrationEvent $event)
    {
        $dst = $event->getUser()->getEmail();
        $src = $_ENV['EMAIL_APP'];
        $msg = "<h1>Application de démo Symfony : MoviesBlog</h1><h2>Vous etes inscrit à movieblog</h2><p>Vous pouvez dorénavant laisser des commentaires sur le blog en vous identifiant à l'aide de cette adresse Email et du mot de passe que vous avez défini lors de votre inscription</p>";
        $obj = "Vous etes inscrit à movieblog";
        $this->mailService->setMail($src,$dst, $obj, $msg);
        $this->mailService->send();
       
    }
}