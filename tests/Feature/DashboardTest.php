<?php

use App\Models\User;

use function Pest\Laravel\actingAs;

it('may display the dashboard page', function () {
    actingAs(User::first())
        ->get(route('dashboard', absolute: false))
        ->assertOk();
});

it('may display the settings page', function () {
    actingAs(User::first())
        ->get(route('settings', absolute: false))
        ->assertOk();
});
