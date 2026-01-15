<?php

use App\Models\User;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Auth\Events\PasswordResetLinkSent;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Notification;

use function Pest\Laravel\get;
use function Pest\Laravel\post;

it('may display the forgot password page', function () {
    get(route('password.request', absolute: false))
        ->assertOk();
});

it('may validate and throttle forgot password requests', function () {
    $uri = route('password.email', absolute: false);
    $data = ['email' => 'info@example.com'];

    post($uri, $data)->assertSessionHasNoErrors();

    post($uri, $data)->assertSessionHasErrors('root');
});

it('may display the reset password page', function () {
    get(route('password.reset', ['token' => 'some_token'], false))
        ->assertOk();
});

it('may accept a forgot and reset password request', function () {
    Event::fake();
    Notification::fake();

    $user = User::first();

    post(route('password.email', absolute: false), ['email' => $user->email])
        ->assertSessionHasNoErrors();

    Event::assertDispatched(PasswordResetLinkSent::class);

    $token = '';

    Notification::assertSentTo($user, ResetPassword::class, function ($notification) use (&$token) {
        return (bool) ($token = $notification->token);
    });

    post(route('password.store', absolute: false), [
        'token' => $token,
        'email' => $user->email,
        'password' => 'password',
        'password_confirmation' => 'password',
    ])
        ->assertSessionHasNoErrors()
        ->assertRedirect(route('login'));

    Event::assertDispatched(PasswordReset::class);
});

it('may validate reset password requests', function () {
    post(route('password.store', absolute: false), [
        'token' => 'wrong-token',
        'email' => User::first()->email,
        'password' => 'password',
        'password_confirmation' => 'password',
    ])->assertSessionHasErrors('root');
});
