<?php

namespace App\Listeners;

use App\Events\TeamDeleting;
// use App\Events\TeamMemberRemoved;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class CurrentTeamFallback
{
    /**
     * Create the event listener.
     */
    public function __construct() {}

    /**
     * Handle the event.
     */
    // public function handle(TeamDeleting|TeamMemberRemoved $event): void
    public function handle(TeamDeleting $event): void
    {
        // if (is_a($event, TeamMemberRemoved::class)) {
        //     $this->onMemberRemoved($event);
        // }

        if (is_a($event, TeamDeleting::class)) {
            $this->onTeamDeleting($event);
        }
    }

    // /**
    //  * Current team fallback for the TeamMemberRemoved event.
    //  */
    // protected function onMemberRemoved(TeamMemberRemoved $event): void
    // {
    //     // If team was current
    //     if ($event->team->id === $event->user->current_team_id) {
    //         $user = $event->user;

    //         // Load relation
    //         $user->loadMissing('teams');

    //         $another_team = $user->teams->first();

    //         // Set another current team or null
    //         if (is_null($another_team)) {
    //             $user->currentTeam()->dissociate();
    //         } else {
    //             $user->currentTeam()->associate($another_team);
    //         }

    //         // Run query
    //         $user->save();
    //     }
    // }

    /**
     * Current team fallback for the TeamDeleting event.
     */
    protected function onTeamDeleting(TeamDeleting $event): void
    {
        $event->team->loadMissing('users', 'users.teams');

        DB::transaction(function () use ($event) {
            // For each related user
            $event->team->users->each(function (User $user) use ($event) {
                // If team was current
                if ($event->team->id === $user->current_team_id) {
                    // Search for a team different from the one being deleted
                    $another_team = $user
                        ->teams
                        ->firstWhere('id', '<>', $event->team->id);

                    // Set another current team or null
                    if (is_null($another_team)) {
                        $user->currentTeam()->dissociate();
                    } else {
                        $user->currentTeam()->associate($another_team);
                    }

                    $user->save();
                }
            });
        });
    }
}
