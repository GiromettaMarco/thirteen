<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\Task;
use App\Models\Team;
use Illuminate\Database\Seeder;
use Illuminate\Support\Collection;

// @NOTE keep a minimum of 2 projects and 1 task for testing purpose

class ProjectAndTaskSeeder extends Seeder
{
    public function run(): void
    {
        $teams = Team::with('profiles')->get();

        $teams->each(function ($team) {
            /** @var Collection<int, Project> */
            $projects = Project::factory()
                ->count(rand(2, 5))
                ->for($team)
                ->create();

            $projects->each(function ($project) use ($team) {
                $team->profiles->each(function ($profile) use ($project) {
                    Task::factory()
                        ->count(rand(1, 10))
                        ->for($project)
                        ->create([
                            'profile_id' => $profile->id,
                        ]);
                });

                Task::factory()
                    ->count(rand(1, 10))
                    ->for($project)
                    ->create();
            });
        });
    }
}
