<?php

namespace App\Event;

use App\Entity\User;
use Symfony\Contracts\EventDispatcher\Event;


class RegistrationEvent extends Event
{

    const USER_CREATED_EVENT = 'user.created';

    public function __construct(private User $user) {}

    public function getUser(): User {
        return $this->user;
    }

}