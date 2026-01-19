<?php

use App\Models\User;

use function Pest\Laravel\actingAs;

it('may display a profile page', function () {
    $user = User::first();

    actingAs($user)
        ->get(route('profile.show', ['profile' => $user->profile->id], false))
        ->assertOk();
});

it('may accept a profile update request', function () {
    $user = User::first();

    actingAs($user)
        ->put(
            route('profile.update', ['profile' => $user->profile->id], false),
            [
                'name' => 'John Smith',
                'role' => 'manager',
                'public' => '1',
            ]
        )
        ->assertSessionHasNoErrors();
});
