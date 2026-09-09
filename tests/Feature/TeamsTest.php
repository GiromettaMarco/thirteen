<?php

use App\Models\Profile;
use App\Models\Team;
use App\Models\User;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

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
    $team = $user
        ->profile
        ->teams()
        ->where('teams.id', '<>', $user->current_team_id)
        ->first();

    actingAs($user)
        ->put(route('current-team.update', ['id' => $team->id]))
        ->assertSessionHasNoErrors();

    $user->refresh();

    expect($user->current_team_id)
        ->toBe($team->id);
});

it('may validate an update current team request', function () {
    $user = User::first();
    $related_team_ids = $user->profile->teams->pluck('id');
    $team = Team::whereNotIn('id', $related_team_ids)->first();

    actingAs($user)
        ->put(route('current-team.update', ['id' => $team->id]))
        ->assertSessionHasErrors('id');
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
    // Collect a team with users with edit permissions
    $team = Team::with(['profiles' => function (BelongsToMany $query) {
        $query->where('can_edit_team', true);
    }, 'profiles.user'])->first();

    $user = $team->profiles->first()->user;

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
    // Collect a team with users without edit permissions
    $team = Team::with(['profiles' => function (BelongsToMany $query) {
        $query->where('can_edit_team', false);
    }, 'profiles.user'])->first();

    $user = $team->profiles->first()->user;

    actingAs($user)
        ->put(
            route('teams.update', ['team' => $team->id]),
            ['name' => 'Name Changed Team']
        )
        ->assertStatus(403);
});

it('may accept a delete team request and fallback current team', function () {
    $user = User::where('email', 'alice@example.com')->first();
    $team_id = $user->current_team_id;

    actingAs($user)
        ->delete(route('teams.destroy', ['team' => $team_id]))
        ->assertSessionHasNoErrors();

    expect($user->profile->teams->find($team_id))
        ->toBeNull();

    $user->refresh();

    expect($user->current_team_id)->not->toBe($team_id);
    expect($user->current_team_id)->not->toBeNull();
});

it('may apply policies to a delete team request', function () {
    $user = User::where('email', 'bob@example.com')->first();
    $team_id = $user->current_team_id;

    actingAs($user)
        ->delete(route('teams.destroy', ['team' => $team_id]))
        ->assertStatus(403);
});

it('may accept a leave team request', function () {
    $user = User::first();

    $old_team_id = $user->current_team_id;

    actingAs($user)
        ->delete(route('teams.leave', ['team' => $old_team_id]))
        ->assertSessionHasNoErrors();

    expect($user->profile->teams->find($old_team_id))
        ->toBeNull();

    $user->refresh();

    expect($user->current_team_id)
        ->not
        ->toBe($old_team_id);
});
