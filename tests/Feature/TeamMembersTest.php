<?php

use App\Models\Membership;
use App\Models\Profile;
use App\Models\User;

use function Pest\Laravel\actingAs;

it('may display a team member page', function () {
    $user = User::first();

    $profile = $user->profile;
    $team = $profile->teams()->first();

    actingAs($user)
        ->get(route('members.show', [
            'profile' => $profile->id,
            'team' => $team->id,
        ]))
        ->assertOk();
});

it('may add and update team members', function () {
    $user = User::first();
    $stray_profile = Profile::where('name', 'Stray User')->first();

    actingAs($user)
        ->post(
            route('members.store', ['team' => $user->current_team_id]),
            ['profile_id' => $stray_profile->id]
        )
        ->assertSessionHasNoErrors();

    $membership = Membership::where('profile_id', $stray_profile->id)
        ->where('team_id', $user->current_team_id)
        ->first();

    expect($membership)->not()->toBeNull();
    expect($membership->admin)->toBe(false);

    actingAs($user)
        ->put(
            route('members.update', [
                'profile' => $stray_profile->id,
                'team' => $user->current_team_id,
            ]),
            [
                'admin' => 'true',
                'can_delete_team' => 'true',
                'can_edit_members' => 'true',
                'can_edit_projects' => 'true',
                'can_edit_team' => 'true',
            ]
        )
        ->assertSessionHasNoErrors();

    $membership->refresh();

    expect($membership->admin)->toBe(true);
});

it('may remove members from a team', function () {
    $user = User::first();

    $profile = $user
        ->currentTeam
        ->profiles()
        ->where('profiles.id', '<>', $user->profile->id)
        ->first();

    actingAs($user)
        ->delete(route('members.destroy', [
            'profile' => $profile->id,
            'team' => $user->current_team_id,
        ]))
        ->assertSessionHasNoErrors();

    $new_profile = $user
        ->currentTeam
        ->profiles()
        ->where('profiles.id', $profile->id)
        ->first();

    expect($new_profile)->toBeNull();
});
