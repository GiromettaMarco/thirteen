<?php

use App\Models\Project;
use App\Models\User;

use function Pest\Laravel\actingAs;

it('may display the projects index page', function () {
    $user = User::first();

    actingAs($user)
        ->get(route('projects.index', ['team' => $user->current_team_id]))
        ->assertOk();
});

it('may display a project page', function () {
    $user = User::first();
    $project = $user->currentTeam->projects()->first();

    actingAs($user)
        ->get(route('projects.show', [
            'project' => $project->id,
            'team' => $project->team_id,
        ]))
        ->assertOk();
});

it('may validate that project is related to team', function () {
    $user = User::first();
    $teams = $user->profile->teams;
    $project = $teams->get(0)->projects()->first();

    actingAs($user)
        ->get(route('projects.show', [
            'project' => $project->id,
            'team' => $teams->get(1)->id,
        ]))
        ->assertStatus(404);
});

it('may accept a create project request', function () {
    $user = User::first();

    actingAs($user)
        ->post(
            route('projects.store', ['team' => $user->current_team_id]),
            ['name' => 'New Project']
        )
        ->assertSessionHasNoErrors();

    $project = $user
        ->currentTeam
        ->projects()
        ->where('name', 'New Project')
        ->first();

    expect($project)->not()->toBeNull();
});

it('may accept an update project request', function () {
    $user = User::first();
    $project = $user->currentTeam->projects()->first();

    actingAs($user)
        ->put(
            route('projects.update', [
                'project' => $project->id,
                'team' => $project->team_id,
            ]),
            [
                'name' => 'Name Changed Project',
            ]
        )
        ->assertSessionHasNoErrors();

    $project->refresh();

    expect($project->name)->toBe('Name Changed Project');
});

it('may accept a delete project request', function () {
    $user = User::first();
    $project = $user->currentTeam->projects()->first();

    actingAs($user)
        ->delete(route('projects.destroy', [
            'project' => $project->id,
            'team' => $project->team_id,
        ]))
        ->assertSessionHasNoErrors();

    expect(Project::find($project->id))->toBeNull();
});

it('may accept a delete many projects request', function () {
    $user = User::first();
    $project_ids = Project::where('team_id', $user->current_team_id)
        ->get()
        ->pluck('id')
        ->all();

    actingAs($user)
        ->post(
            route('projects.destroy-many', [
                'team' => $user->current_team_id,
            ]),
            ['ids' => $project_ids]
        )
        ->assertSessionHasNoErrors();

    expect(Project::where('team_id', $user->current_team_id)->first())
        ->toBeNull();
});

it('may validate that project ids are related to team when deleting many', function () {
    $user = User::first();
    $teams = $user->profile->teams;
    $project = $teams->get(0)->projects()->first();

    actingAs($user)
        ->post(
            route('projects.destroy-many', [
                'team' => $teams->get(1)->id,
            ]),
            ['ids' => [$project->id]]
        )
        ->assertSessionHasErrors('ids');
});
