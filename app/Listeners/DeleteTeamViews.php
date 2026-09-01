<?php

namespace App\Listeners;

use App\Events\TeamDeleting;
use App\Models\View;

class DeleteTeamViews
{
    /**
     * Create the event listener.
     */
    public function __construct() {}

    /**
     * Handle the event.
     */
    public function handle(TeamDeleting $event): void
    {
        // Delete views but skip model events
        View::where('page', 'teams.show/'.$event->team->id)
            ->orWhere('table', 'projects/team:'.$event->team->id)
            ->delete();
    }
}
