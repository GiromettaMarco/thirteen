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

    /**
     * Determine whether the user can edit team members.
     */
    public function editMembers(User $user, Team $team): Response
    {
        return $team->pivot->can_edit_members
            ? Response::allow()
            : Response::deny();
    }

    /**
     * Determine whether the user can edit related projects.
     */
    public function editProjects(User $user, Team $team): Response
    {
        return $team->pivot->can_edit_projects
            ? Response::allow()
            : Response::deny();
    }
}
