<?php

namespace App\Events;

use App\Models\User;
use Illuminate\Foundation\Events\Dispatchable;

class PasswordUpdatedViaController
{
    use Dispatchable;

    /**
     * Create a new event instance.
     */
    public function __construct(public User $user) {}
}
