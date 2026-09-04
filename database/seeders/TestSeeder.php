<?php

namespace Database\Seeders;

use App\Enums\ProfileRole;
use App\Models\Profile;
use App\Models\Team;
use App\Models\User;
use Illuminate\Database\Seeder;

class TestSeeder extends Seeder
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
        $teams = Team::factory(2)->create();

        /** @var Team */
        $team = $teams->first();

        User::factory()
            ->has(Profile::factory()
                ->state([
                    'name' => 'Alice Admin',
                    'role' => ProfileRole::Manager,
                    'public' => true,
                ])
                // @phpstan-ignore argument.type
                ->hasAttached($teams, [
                    self::$team_permissions['admin'],
                    self::$team_permissions['reader'],
                ]))
            ->for($team, 'currentTeam')
            ->create([
                'email' => 'alice@example.com',
                'password' => 'AJf$hj7jn&bdMc',
                'can_view_users' => true,
                'can_edit_users' => true,
            ]);

        User::factory()
            ->has(Profile::factory()
                ->state([
                    'name' => 'Bob Brown',
                    'role' => ProfileRole::Guest,
                    'public' => true,
                ])
                    // @phpstan-ignore argument.type
                ->hasAttached($teams, [
                    self::$team_permissions['reader'],
                    self::$team_permissions['admin'],
                ])
            )
            ->for($team, 'currentTeam')
            ->create([
                'email' => 'bob@example.com',
                'password' => 'KL$M(bgd#bhd42',
            ]);
    }
}
