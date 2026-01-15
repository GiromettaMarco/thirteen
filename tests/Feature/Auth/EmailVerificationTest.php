<?php

use App\Models\User;
use Illuminate\Auth\Events\Verified;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\URL;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\post;
use function PHPUnit\Framework\assertTrue;

it('may display the verify email page', function () {
    actingAs(User::factory()->unverified()->create())
        ->get(route('verification.notice', absolute: false))
        ->assertOk();
});

it('may accept a send verification request', function () {
    Notification::fake();

    $user = User::factory()->unverified()->create();

    actingAs($user)
        ->post(route('verification.send', absolute: false))
        ->assertSessionHasNoErrors();

    Notification::assertSentTo($user, VerifyEmail::class);
});

it('may throttle send verification requests', function () {
    Notification::fake();

    actingAs(User::factory()->unverified()->create());

    $uri = route('verification.send', absolute: false);

    post($uri)->assertSessionHasNoErrors();
    post($uri)->assertSessionHasNoErrors();
    post($uri)->assertSessionHasErrors('root');
});

it('may accept a verify verification request', function () {
    Event::fake();

    $user = User::factory()->unverified()->create();

    $verificationUrl = URL::temporarySignedRoute(
        'verification.verify',
        now()->addMinutes(60),
        ['id' => $user->id, 'hash' => sha1($user->email)]
    );

    actingAs($user)
        ->get($verificationUrl)
        ->assertRedirect(route('dashboard', ['verified' => '1'], false));

    Event::assertDispatched(Verified::class);
    assertTrue($user->fresh()->hasVerifiedEmail());
});

it('may redirect', function () {
    // ...
})->todo();

it('may send a verify email notification after a new user registration', function () {
    // ...
})->todo();
