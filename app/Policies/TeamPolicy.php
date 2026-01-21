<?php

namespace App\Policies;

use App\Models\Team;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class TeamPolicy
{
    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Team $team): Response
    {
        return $team->pivot->can_edit
            ? Response::allow()
            : Response::deny();
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Team $team): Response
    {
        return $team->pivot->can_delete
            ? Response::allow()
            : Response::deny();
    }

    // /**
    //  * Determine whether the user can edit related projects.
    //  */
    // public function editProjects(User $user, Team $team): Response
    // {
    //     return Permissions::isTeamAdmin($team)
    //         ? Response::allow()
    //         : Response::deny(__('messages.403'));
    // }

    // /**
    //  * Determine whether the user can edit team members.
    //  */
    // public function editMembers(User $user, Team $team): Response
    // {
    //     return Permissions::isTeamAdmin($team)
    //         ? Response::allow()
    //         : Response::deny(__('messages.403'));
    // }

    // /**
    //  * Determine whether the user can remove a member from the team.
    //  */
    // public function removeMember(User $user, Team $team, User $member): Response
    // {
    //     // Auth user must be admin for the team or must be removing himself
    //     if (
    //         $user->id !== $member->id &&
    //         ! Permissions::isTeamAdmin($team)
    //     ) {
    //         return Response::deny(__('messages.403'));
    //     }

    //     // There must be at least one admin left after removing
    //     if ($member->pivot->role === 'admin') {
    //         $count = $team->users()->wherePivot('role', 'admin')->count();

    //         if ($count < 2) {
    //             return Response::deny(__('messages.min_admin'));
    //         }
    //     }

    //     return Response::allow();
    // }
}
