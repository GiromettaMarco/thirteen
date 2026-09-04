<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\Task;
use App\Models\Team;
use Illuminate\Database\Seeder;
use Illuminate\Support\Collection;

class ProjectAndTaskSeeder extends Seeder
{
    public function run(): void
    {
        $teams = Team::with('profiles')->get();

        $teams->each(function ($team) {
            /** @var Collection<int, Project> */
            $projects = Project::factory()
                ->count(rand(1, 5))
                ->for($team)
                ->create();

            $projects->each(function ($project) use ($team) {
                $team->profiles->each(function ($profile) use ($project) {
                    Task::factory()
                        ->count(rand(0, 10))
                        ->for($project)
                        ->create([
                            'profile_id' => $profile->id,
                        ]);
                });

                Task::factory()
                    ->count(rand(0, 10))
                    ->for($project)
                    ->create();
            });
        });
    }
}
