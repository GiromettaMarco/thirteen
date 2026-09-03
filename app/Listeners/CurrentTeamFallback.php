<?php

namespace App\Listeners;

use App\Events\TeamDeleting;
use App\Events\TeamMemberRemoved;
use App\Models\Profile;
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
    public function handle(TeamDeleting|TeamMemberRemoved $event): void
    {
        if ($event instanceof TeamMemberRemoved) {
            $this->onMemberRemoved($event);
        }

        if ($event instanceof TeamDeleting) {
            $this->onTeamDeleting($event);
        }
    }

    /**
     * Current team fallback for the TeamMemberRemoved event.
     */
    protected function onMemberRemoved(TeamMemberRemoved $event): void
    {
        // If team was current
        if ($event->team->id === $event->user->current_team_id) {
            $user = $event->user;

            $another_team = $user->profile->teams()->first();

            // Set another current team or null
            if (is_null($another_team)) {
                $user->currentTeam()->dissociate();
            } else {
                $user->currentTeam()->associate($another_team);
            }

            // Run query
            $user->save();
        }
    }

    /**
     * Current team fallback for the TeamDeleting event.
     */
    protected function onTeamDeleting(TeamDeleting $event): void
    {
        $event->team->loadMissing([
            'profiles',
            'profiles.user',
            'profiles.teams',
        ]);

        DB::transaction(function () use ($event) {
            $event->team->profiles->each(function (Profile $profile) use ($event) {
                $user = $profile->user;

                // If team was current
                if ($event->team->id === $user->current_team_id) {
                    // Search for a team different from the one being deleted
                    $another_team = $profile
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
