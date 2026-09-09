<?php

use App\Models\Profile;
use App\Models\User;
use App\Notifications\VerifyEmail;
use Illuminate\Auth\Events\Verified;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\URL;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\post;
use function PHPUnit\Framework\assertTrue;

it('may display the verify email page', function () {
    /** @var User */
    $user = User::factory()
        ->has(Profile::factory())
        ->unverified()
        ->createOne();

    actingAs($user)
        ->get(route('verification.notice', absolute: false))
        ->assertOk();
});

it('may redirect unverified users', function () {
    /** @var User */
    $user = User::factory()
        ->has(Profile::factory())
        ->unverified()
        ->createOne();

    actingAs($user)
        ->get(route('dashboard'))
        ->assertRedirect(route('verification.notice'));
});

it('may accept a send verification request', function () {
    Notification::fake();

    /** @var User */
    $user = User::factory()
        ->has(Profile::factory())
        ->unverified()
        ->createOne();

    actingAs($user)
        ->post(route('verification.send', absolute: false))
        ->assertSessionHasNoErrors();

    Notification::assertSentTo($user, VerifyEmail::class);
});

it('may throttle send verification requests', function () {
    /** @var User */
    $user = User::factory()
        ->has(Profile::factory())
        ->unverified()
        ->createOne();

    actingAs($user);

    $uri = route('verification.send', absolute: false);

    post($uri)->assertSessionHasNoErrors();
    post($uri)->assertSessionHasNoErrors();
    post($uri)->assertSessionHasErrors('root');
});

it('may accept a verify verification request', function () {
    Event::fake();

    /** @var User */
    $user = User::factory()
        ->has(Profile::factory())
        ->unverified()
        ->createOne();

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

it('may send a verify email notification after a new user registration', function () {
    Notification::fake();

    post(route('register.store', absolute: false), [
        'name' => 'John Smith',
        'email' => 'jhonsmith@example.com',
        'password' => 'New_Password_1234',
        'password_confirmation' => 'New_Password_1234',
    ])->assertSessionHasNoErrors();

    Notification::assertSentTimes(VerifyEmail::class, 1);
});
