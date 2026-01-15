<?php

use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Event;

use function Pest\Laravel\assertAuthenticated;
use function Pest\Laravel\get;
use function Pest\Laravel\post;

it('may display the registration page', function () {
    get(route('register', absolute: false))
        ->assertOk();
});

it('may accept a register request', function () {
    Event::fake();

    post(route('register.store', absolute: false), [
        'name' => 'John Smith',
        'email' => 'jhonsmith@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ])->assertSessionHasNoErrors();

    assertAuthenticated();

    Event::assertDispatched(Registered::class);
});

it('may validate and throttle register requests when email is already taken', function () {
    $uri = route('register.store', absolute: false);
    $data = [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ];

    post($uri, $data)->assertSessionHasErrors('email');
    post($uri, $data)->assertSessionHasErrors('email');

    post($uri, $data)->assertSessionHasErrors('root');
});

it('may throttle successful register requests', function () {
    Event::fake();

    post(route('register.store', absolute: false), [
        'name' => 'John Smith',
        'email' => 'jhonsmith@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ])->assertSessionHasNoErrors();

    assertAuthenticated();

    Event::assertDispatched(Registered::class);

    Auth::logout();

    post(route('register.store', absolute: false), [
        'name' => 'John Smith',
        'email' => 'jhonsmith@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ])->assertSessionHasErrors('root');
});
