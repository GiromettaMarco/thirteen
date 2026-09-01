<?php

namespace App\Listeners;

use App\Events\TeamMemberRemoved;
use App\Events\UserDeleting;
use App\Models\Team;
use Illuminate\Support\Facades\DB;

class DeleteEmptyTeams
{
    /**
     * Create the event listener.
     */
    public function __construct() {}

    /**
     * Handle the event.
     */
    public function handle(TeamMemberRemoved|UserDeleting $event): void
    {
        if (is_a($event, TeamMemberRemoved::class)) {
            $this->onMemberRemoved($event);
        }

        if (is_a($event, UserDeleting::class)) {
            $this->onProfileDeleting($event);
        }
    }

    /**
     * When a team member is removed, delete the team if is empty.
     */
    protected function onMemberRemoved(TeamMemberRemoved $event): void
    {
        $team = $event->team->loadCount('profiles');

        if ($team->profiles_count == 0) {
            $event->team->delete();
        }
    }

    /**
     * When a profile is deleted, delete related teams if they are empty.
     */
    protected function onProfileDeleting(UserDeleting $event): void
    {
        // Load relations
        $event->user->loadMissing([
            'profile',
            'profile.teams',
            'profile.teams.profiles',
        ]);

        // Group queries
        DB::transaction(function () use ($event) {
            $event->user->profile->teams->each(function (Team $team) {
                if ($team->profiles->count() < 2) {
                    $team->delete();
                }
            });
        });
    }
}
