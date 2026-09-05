<?php

namespace App\Listeners;

use App\Events\TeamMemberRemoved;
use App\Models\Task;

/**
 * Dissociate related tasks when a member leaves the team.
 */
class DissociateTasks
{
    /**
     * Create the event listener.
     */
    public function __construct() {}

    /**
     * Handle the event.
     */
    public function handle(TeamMemberRemoved $event): void
    {
        // Skip events
        Task::where('profile_id', $event->user->profile->id)
            ->whereIn('project_id', $event->team->projects->pluck('id'))
            ->update(['profile_id' => null]);
    }
}
