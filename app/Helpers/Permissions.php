<?php

namespace App\Helpers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

class Permissions
{
    /**
     *  Get app level permissions for the current authenticated user.
     *
     * @param  array<string, mixed>|null  $resource  Resource permissions.
     * @return array<string, mixed>
     */
    public static function getPermissions(?array $resource = null): array
    {
        $user = Auth::user();

        $permissions = [
            'users' => [
                'edit' => false,
                'view' => false,
            ],
        ];

        if ($user instanceof User) {
            $permissions['users']['edit'] = $user->can('create', User::class);
            $permissions['users']['view'] = $user->can('viewAny', User::class);
        }

        if ($resource != null) {
            $permissions['resource'] = $resource;
        }

        return $permissions;
    }

    /**
     * Get all authentication data required by the administrative
     * section of the application.
     *
     * @param  array<string, mixed>|null  $resource  Resource permissions.
     * @return array<string, mixed>
     */
    public static function getAuth(?array $resource = null): ?array
    {
        return [
            'password_confirmed_at' => session()->get('auth.password_confirmed_at'),
            'permissions' => self::getPermissions($resource),
            'user' => self::getUser(),
        ];
    }

    /**
     * Get the authenticated user data.
     *
     * @return array<string, mixed>|null
     */
    public static function getUser(): ?array
    {
        $user = Auth::user();

        if ($user instanceof User) {
            return [
                'created_at' => $user->created_at,
                'current_team_id' => $user->current_team_id,
                'email' => $user->email,
                'email_verified_at' => $user->email_verified_at,
                'id' => $user->id,
                'name' => $user->profile->name,
                'profile_id' => $user->profile->id,
                'updated_at' => $user->updated_at,
            ];
        }

        return null;
    }
}
