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
        $all_teams = Team::factory(3)->create();
        $admin_teams = $all_teams->slice(0, 2);
        /** @var Team */
        $current_team = $all_teams->first();

        User::factory()
            ->has(Profile::factory()
                ->state([
                    'name' => 'Alice Admin',
                    'role' => ProfileRole::Manager,
                    'public' => true,
                ])
                // @phpstan-ignore argument.type
                ->hasAttached($admin_teams, [
                    self::$team_permissions['admin'],
                    self::$team_permissions['admin'],
                ]))
            ->for($current_team, 'currentTeam')
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
                    'role' => ProfileRole::Designer,
                    'public' => true,
                ])
                    // @phpstan-ignore argument.type
                ->hasAttached($all_teams, [
                    self::$team_permissions['reader'],
                    self::$team_permissions['reader'],
                    self::$team_permissions['admin'],
                ])
            )
            ->for($current_team, 'currentTeam')
            ->create([
                'email' => 'bob@example.com',
                'password' => 'KL$M(bgd#bhd42',
            ]);

        User::factory()
            ->has(Profile::factory()
                ->state([
                    'name' => 'Stray User',
                    'role' => ProfileRole::Guest,
                    'public' => false,
                ])
            )
            ->create([
                'email' => 'stray@example.com',
                'password' => 'J&jnd_9jkn4ll3JK',
            ]);

        $this->call([
            ProjectAndTaskSeeder::class,
            // InvitationSeeder::class,
        ]);
    }
}
