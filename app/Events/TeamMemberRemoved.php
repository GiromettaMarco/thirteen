<?php

namespace App\Events;

use App\Models\Team;
use App\Models\User;
use Illuminate\Foundation\Events\Dispatchable;

class TeamMemberRemoved
{
    use Dispatchable;

    /**
     * Create a new event instance.
     */
    public function __construct(
        public Team $team,
        public User $user
    ) {}
}
