<?php

namespace Database\Seeders;

use App\Enums\ProfileRole;
use App\Models\Profile;
use App\Models\Team;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Collection;

class UserAndTeamSeeder extends Seeder
{
    /** @var array<string, array<string, bool>> */
    protected static $team_permissions = [
        'admin' => [
            'admin' => true,
            'can_edit_team' => true,
            'can_delete_team' => true,
            'can_edit_members' => true,
            'can_edit_projects' => true,
        ],
        'editor' => [
            'admin' => false,
            'can_delete_team' => false,
            'can_edit_members' => false,
            'can_edit_projects' => true,
            'can_edit_team' => false,
        ],
        'reader' => [
            'admin' => false,
            'can_delete_team' => false,
            'can_edit_members' => false,
            'can_edit_projects' => false,
            'can_edit_team' => false,
        ],
    ];

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        /** @var Collection<int, Team> */
        $teams = Team::factory()
            ->count(10)
            ->create();

        /** @var Team */
        $first_team = $teams->first();

        User::factory()
            ->has(Profile::factory()
                ->state([
                    'name' => 'Test User',
                    'role' => ProfileRole::Manager,
                    'public' => true,
                ])
                ->hasAttached($teams, self::$team_permissions['admin'])
            )
            ->for($first_team, 'currentTeam')
            ->create([
                'email' => 'test@example.com',
                'can_view_users' => true,
                'can_edit_users' => true,
            ]);

        /** @var Collection<int, User> */
        $users = User::factory()
            ->count(60)
            ->has(Profile::factory())
            ->create();

        // Randomly assign users to teams
        $users->each(function ($user) use ($teams) {
            $team_ids = [];
            for ($i = 0; $i < rand(1, 3); $i++) {
                $team_ids[] = $teams->get(rand(0, $teams->count() - 1))?->id;
            }

            $permissions = rand(0, 1) ? self::$team_permissions['reader'] : self::$team_permissions['editor'];

            $user->profile->teams()->syncWithPivotValues($team_ids, $permissions, false);
        });
    }
}
