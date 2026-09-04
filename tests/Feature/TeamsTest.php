<?php

use App\Models\Profile;
use App\Models\User;

use function Pest\Laravel\actingAs;

it('may display the teams index page', function () {
    actingAs(User::first())
        ->get(route('teams.index'))
        ->assertOk();
});

it('may display a team page', function () {
    actingAs(User::first())
        ->get(route('teams.show', ['team' => 1]))
        ->assertOk();
});

it('may accept an update current team request', function () {
    $user = User::first();

    actingAs($user)
        ->put(route('current-team.update', ['id' => 2]))
        ->assertSessionHasNoErrors();

    $user->refresh();

    expect($user->current_team_id)
        ->toBe(2);
});

it('may accept a create team request', function () {
    $user = User::first();

    actingAs($user)
        ->post(route('teams.store'), ['name' => 'New Team'])
        ->assertSessionHasNoErrors();

    expect($user->profile->teams->where('name', 'New Team')->first())
        ->not()
        ->toBeNull();
});

it('may auto assign current team on create if missing', function () {
    /** @var User */
    $user = User::factory()
        ->has(Profile::factory())
        ->createOne();

    actingAs($user)
        ->post(route('teams.store'), ['name' => 'New Team'])
        ->assertSessionHasNoErrors();

    $user->refresh();

    expect($user->currentTeam->name)->toBe('New Team');
});

it('may accept an update team request', function () {
    $user = User::first();

    actingAs($user)
        ->put(route('teams.update', ['team' => 1]), [
            'name' => 'Name Changed Team',
        ])
        ->assertSessionHasNoErrors();

    expect($user->profile->teams->where('name', 'Name Changed Team')->first())
        ->not()
        ->toBeNull();
});

it('may apply policies to an update team request', function () {
    actingAs(User::first())
        ->put(route('teams.update', ['team' => 2]), [
            'name' => 'Name Changed Team',
        ])
        ->assertStatus(403);
});

it('may accept a delete team request and fallback current team', function () {
    $user = User::first();

    actingAs($user)
        ->delete(route('teams.destroy', ['team' => 1]))
        ->assertSessionHasNoErrors();

    expect($user->profile->teams->find(1))
        ->toBeNull();

    $user->refresh();

    expect($user->current_team_id)
        ->toBe(2);
});

it('may apply policies to a delete team request', function () {
    $user = User::first();

    actingAs($user)
        ->delete(route('teams.destroy', ['team' => 2]))
        ->assertStatus(403);
});
