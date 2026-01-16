<?php

use App\Models\User;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\get;
use function Pest\Laravel\post;

it('may protect auth routes', function () {
    $uri = route('login', absolute: false);

    get(route('verification.notice', absolute: false))
        ->assertRedirect($uri);

    post(route('verification.send', absolute: false))
        ->assertRedirect($uri);

    get(route('verification.verify', ['id' => 1, 'hash' => 'a'], false))
        ->assertRedirect($uri);

    get(route('password.confirm', absolute: false))
        ->assertRedirect($uri);

    post(route('password.validate', absolute: false))
        ->assertRedirect($uri);

    post(route('logout', absolute: false))
        ->assertRedirect($uri);

    get(route('dashboard', absolute: false))
        ->assertRedirect($uri);
});

it('may redirect guest routes to the dashboard', function () {
    $uri = route('dashboard', absolute: false);

    actingAs(User::first());

    get(route('register', absolute: false))
        ->assertRedirect($uri);

    post(route('register.store', absolute: false))
        ->assertRedirect($uri);

    get(route('login', absolute: false))
        ->assertRedirect($uri);

    post(route('login.store', absolute: false))
        ->assertRedirect($uri);

    get(route('password.request', absolute: false))
        ->assertRedirect($uri);

    post(route('password.email', absolute: false))
        ->assertRedirect($uri);

    get(route('password.reset', ['token' => 'a'], false))
        ->assertRedirect($uri);

    post(route('password.store', absolute: false))
        ->assertRedirect($uri);
});
