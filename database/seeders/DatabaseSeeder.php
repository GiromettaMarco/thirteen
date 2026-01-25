<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Team;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $view_users = Permission::create(['name' => 'view-users']);
        $edit_users = Permission::create(['name' => 'edit-users']);

        $teams = Team::factory(3)
            ->create();

        $all_permissions = [
            'admin' => true,
            'can_edit' => true,
            'can_delete' => true,
            'can_add_members' => true,
            'can_edit_members' => true,
            'can_remove_members' => true,
        ];

        $no_permissions = [
            'admin' => false,
            'can_edit' => false,
            'can_delete' => false,
            'can_add_members' => false,
            'can_edit_members' => false,
            'can_remove_members' => false,
        ];

        /** @var User */
        $test_user = User::factory()
            ->for($teams[0], 'currentTeam')
            ->hasAttached($view_users)
            ->hasAttached($edit_users)
            ->withProfile('Test User')
            ->create(['email' => 'test@example.com']);

        $test_user->profile->teams()->attach([
            1 => $all_permissions,
            2 => $no_permissions,
        ]);

        User::factory()
            ->withProfile('Alfred M. Harrison')
            ->create(['email' => 'alfredmharrison@example.com']);

        /** @var User */
        $bob_brown = User::factory()
            ->for($teams[0], 'currentTeam')
            ->withProfile('Bob Brown')
            ->create(['email' => 'bob@example.com']);

        $bob_brown->profile->teams()->attach([
            1 => $no_permissions,
            2 => $all_permissions,
            3 => $all_permissions,
        ]);
    }
}
