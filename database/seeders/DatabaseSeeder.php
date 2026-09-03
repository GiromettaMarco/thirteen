<?php

namespace Database\Seeders;

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
        $teams = Team::factory(3)->create();

        /** @var Team */
        $team_1 = $teams[0];

        $all_permissions = [
            'admin' => true,
            'can_edit_team' => true,
            'can_delete_team' => true,
            'can_edit_members' => true,
            'can_edit_projects' => true,
        ];

        $no_permissions = [
            'admin' => false,
            'can_delete_team' => false,
            'can_edit_members' => false,
            'can_edit_projects' => false,
            'can_edit_team' => false,
        ];

        /** @var User */
        $test_user = User::factory()
            ->for($team_1, 'currentTeam')
            ->withProfile('Test User', 'manager', true)
            ->create([
                'email' => 'test@example.com',
                'can_view_users' => true,
                'can_edit_users' => true,
            ]);

        $test_user->profile->teams()->attach([
            1 => $all_permissions,
            2 => $no_permissions,
        ]);

        User::factory()
            ->withProfile('Alfred M. Harrison', 'designer', true)
            ->create(['email' => 'alfredmharrison@example.com']);

        /** @var User */
        $bob_brown = User::factory()
            ->for($team_1, 'currentTeam')
            ->withProfile('Bob Brown')
            ->create(['email' => 'bob@example.com']);

        $bob_brown->profile->teams()->attach([
            1 => $no_permissions,
            2 => $all_permissions,
            3 => $all_permissions,
        ]);

        // Run other seeders
        $this->call([
            TasksSeeder::class,
        ]);
    }
}
