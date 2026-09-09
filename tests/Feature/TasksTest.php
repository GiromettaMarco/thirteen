<?php

use App\Models\Profile;
use App\Models\Task;
use App\Models\User;

use function Pest\Laravel\actingAs;

it('may accept a create task request', function () {
    $user = User::first();
    $project = $user->currentTeam->projects()->first();

    actingAs($user)
        ->post(
            route('tasks.store', [
                'project' => $project->id,
                'team' => $project->team_id,
            ]),
            ['name' => 'New Task']
        )
        ->assertSessionHasNoErrors();

    $task = $project
        ->tasks()
        ->where('name', 'New Task')
        ->first();

    expect($task)->not()->toBeNull();
});

it('may validate that profile is related to team when creating a task', function () {
    $user = User::first();
    $stray_profile = Profile::where('name', 'Stray User')->first();
    $project = $user->currentTeam->projects()->first();

    actingAs($user)
        ->post(
            route('tasks.store', [
                'project' => $project->id,
                'team' => $project->team_id,
            ]),
            [
                'name' => 'New Task',
                'profile_id' => $stray_profile->id,
            ]
        )
        ->assertSessionHasErrors('profile_id');
});

it('may accept an update task request', function () {
    $user = User::first();
    $project = $user->currentTeam->projects()->first();
    $task = $project->tasks()->first();

    actingAs($user)
        ->put(
            route('tasks.update', [
                'project' => $project->id,
                'task' => $task->id,
                'team' => $project->team_id,
            ]),
            ['name' => 'Name Changed Task']
        )
        ->assertSessionHasNoErrors();

    $task->refresh();

    expect($task->name)->toBe('Name Changed Task');
});

it('may validate that task is related to project', function () {
    $user = User::first();
    $projects = $user->currentTeam->projects;
    $task = $projects->get(0)->tasks()->first();

    actingAs($user)
        ->put(
            route('tasks.update', [
                'project' => $projects->get(1)->id,
                'task' => $task->id,
                'team' => $user->currentTeam->id,
            ]),
            ['name' => 'Name Changed Task']
        )
        ->assertStatus(404);
});

it('may accept a delete task request', function () {
    $user = User::first();
    $project = $user->currentTeam->projects()->first();
    $task = $project->tasks()->first();

    actingAs($user)
        ->delete(route('tasks.destroy', [
            'project' => $project->id,
            'task' => $task->id,
            'team' => $project->team_id,
        ]))
        ->assertSessionHasNoErrors();

    expect(Task::find($task->id))->toBeNull();
});

it('may accept a delete many tasks request', function () {
    $user = User::first();
    $project = $user->currentTeam->projects()->first();
    $task_ids = Task::where('project_id', $project->id)
        ->get()
        ->pluck('id')
        ->all();

    actingAs($user)
        ->post(
            route('tasks.destroy-many', [
                'project' => $project->id,
                'team' => $project->team_id,
            ]),
            ['ids' => $task_ids]
        )
        ->assertSessionHasNoErrors();

    expect(Task::where('project_id', $project->id)->first())
        ->toBeNull();
});

it('may validate that task ids are related to project when deleting many', function () {
    $user = User::first();
    $projects = $user->currentTeam->projects;
    $project = $projects->get(1);
    $task = $projects->get(0)->tasks()->first();

    actingAs($user)
        ->post(
            route('tasks.destroy-many', [
                'project' => $project->id,
                'team' => $project->team_id,
            ]),
            ['ids' => [$task->id]]
        )
        ->assertSessionHasErrors('ids');
});
