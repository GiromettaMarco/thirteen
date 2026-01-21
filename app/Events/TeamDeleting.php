<?php

namespace App\Events;

use App\Models\Team;
use Illuminate\Foundation\Events\Dispatchable;

class TeamDeleting
{
    use Dispatchable;

    /**
     * Create a new event instance.
     */
    public function __construct(public Team $team) {}
}
