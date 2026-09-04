<?php

use App\Events\UserLoggedIn;
use App\Models\User;
use Illuminate\Auth\Events\Lockout;
use Illuminate\Support\Facades\Event;
use Inertia\Testing\AssertableInertia as Assert;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\assertAuthenticatedAs;
use function Pest\Laravel\assertGuest;
use function Pest\Laravel\followingRedirects;
use function Pest\Laravel\get;
use function Pest\Laravel\post;

it('may display the login page', function () {
    get(route('login', absolute: false))
        ->assertOk();
});

it('may authenticate the user', function () {
    Event::fake();

    $user = User::first();

    $response = post(route('login.store', absolute: false), [
        'email' => $user->email,
        'password' => 'AJf$hj7jn&bdMc',
    ]);

    Event::assertDispatched(UserLoggedIn::class);

    assertAuthenticatedAs($user);

    $response->assertRedirect(route('dashboard', absolute: false));
});

it('may validate and throttle login requests', function () {
    Event::fake();

    $uri = route('login.store', absolute: false);
    $data = [
        'email' => 'alice@example.com',
        'password' => 'wrong_password',
    ];

    followingRedirects()
        ->post($uri, $data)
        ->assertInertia(
            fn (Assert $page) => $page->has('errors.root')
        );

    assertGuest();

    post($uri, $data);
    post($uri, $data);
    post($uri, $data);
    post($uri, $data);
    post($uri, $data);

    Event::assertDispatched(Lockout::class);
});

it('may log out the user', function () {
    actingAs(User::first())
        ->post(route('logout', absolute: false))
        ->assertRedirect(route('home', absolute: false));

    assertGuest();
});
