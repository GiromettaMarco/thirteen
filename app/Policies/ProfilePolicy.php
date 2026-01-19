<?php

namespace App\Policies;

use App\Models\Profile;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class ProfilePolicy
{
    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Profile $profile): Response
    {
        return $user->id === $profile->user_id || $profile->public
            ? Response::allow()
            : Response::denyAsNotFound();
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Profile $profile): Response
    {
        return $user->id === $profile->user_id
            ? Response::allow()
            : Response::denyAsNotFound();
    }
}
