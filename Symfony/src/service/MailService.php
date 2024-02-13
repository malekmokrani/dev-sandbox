<?php

namespace App\service;

use Psr\Log\LoggerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\Mailer\MailerInterface;
/**
* Le service MailService permet de composer et envoyer un email
*
* @author Malek <malek.mokrani[@]outlook.com>
*/
class MailService{


    private  ?Email $email = null;

    public function __construct(private LoggerInterface $log,  private MailerInterface $mailer)
    { }

    public function setMail($src, $dst, $obj, $msg)
    {
      
        $this->log->info("setMail mail  :  . $src  $dst $obj $msg" );
        $this->email = (new Email())
        ->from($src)
        ->to($dst)
        ->subject($obj)
        ->html($msg);
        
       
    }


    public function send()
    {
     
        try {
        if($this->email!=null)$this->mailer->send($this->email);
            $this->email = null;
        }catch (\Throwable $th) {
         
            $this->log->error("send mail throw : " .$th->getMessage());
            
        }
    }
}

