<?php

namespace Database\Seeders;

use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class TasksSeeder extends Seeder
{
    public function run(): void
    {
        $profile = User::first()?->profile;

        if ($profile) {
            $team = $profile->teams()->first();

            if ($team) {
                $project = $team->projects()->firstOrCreate([
                    'name' => ucwords(fake()->word()),
                    'deadline' => Carbon::tomorrow(),
                ]);

                Task::factory()
                    ->count(100)
                    ->for($project)
                    ->withProfile($profile->id)
                    ->create();
            }
        }
    }
}
