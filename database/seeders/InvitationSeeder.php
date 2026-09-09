<?php

namespace Database\Seeders;

use App\Enums\ProfileRole;
use App\Models\Invitation;
use App\Models\Profile;
use App\Models\Team;
use App\Models\User;
use Illuminate\Database\Seeder;

class InvitationSeeder extends Seeder
{
    public function run(): void
    {
        $team = Team::first();

        if (is_null($team)) {
            return;
        }

        User::factory()
            ->has(
                Profile::factory()->state([
                    'name' => 'Invited User',
                    'role' => ProfileRole::Guest,
                    'public' => false,
                ])->hasAttached($team)
            )
            ->has(Invitation::factory())
            ->for($team, 'currentTeam')
            ->create([
                'email' => 'invited@example.com',
                'password' => '',
            ]);
    }
}
