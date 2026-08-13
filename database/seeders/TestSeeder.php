<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Team;
use App\Models\User;
use Illuminate\Database\Seeder;

class TestSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $view_users = Permission::create(['name' => 'view-users']);
        $edit_users = Permission::create(['name' => 'edit-users']);

        $teams = Team::factory(3)->create();

        /** @var Team */
        $team_1 = $teams[0];

        $all_permissions = [
            'admin' => true,
            'can_edit' => true,
            'can_delete' => true,
            'can_edit_members' => true,
            'can_edit_projects' => true,
        ];

        $no_permissions = [
            'admin' => false,
            'can_edit' => false,
            'can_delete' => false,
            'can_edit_members' => false,
            'can_edit_projects' => false,
        ];

        /** @var User */
        $alice = User::factory()
            ->for($team_1, 'currentTeam')
            ->hasAttached($view_users)
            ->hasAttached($edit_users)
            ->withProfile('Alice Admin', 'manager')
            ->create([
                'email' => 'alice@example.com',
                'password' => 'AJf$hj7jn&bdMc',
            ]);

        $alice->profile->teams()->attach([
            1 => $all_permissions,
            2 => $no_permissions,
        ]);

        /** @var User */
        $bob = User::factory()
            ->for($team_1, 'currentTeam')
            ->withProfile('Bob Brown')
            ->create([
                'email' => 'bob@example.com',
                'password' => 'KL$M(bgd#bhd42',
            ]);

        // @TODO remove teams
        $bob->profile->teams()->attach([
            1 => $no_permissions,
            2 => $all_permissions,
            3 => $all_permissions,
        ]);
    }
}
