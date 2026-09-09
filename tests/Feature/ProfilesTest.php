<?php

use App\Models\User;
use Illuminate\Testing\Fluent\AssertableJson;

use function Pest\Laravel\actingAs;

it('may display a profile page', function () {
    $user = User::first();

    actingAs($user)
        ->get(route('profile.show', ['profile' => $user->profile->id], false))
        ->assertOk();
});

it('may accept an update profile request', function () {
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

it('may accept a search profile request', function () {
    actingAs(User::first())
        ->get(route('profile.search', ['s' => '@example.com']))
        ->assertOk()
        ->assertJson(
            fn (AssertableJson $json) => $json->first(
                fn (AssertableJson $json) => $json->whereType('id', 'integer')
                    ->whereType('name', 'string')
                    ->whereType('email', 'string')
            )
        );
});
