<?php

use App\Models\User;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Support\Facades\Notification;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\assertGuest;

it('may display the account page', function () {
    actingAs(User::first())
        ->get(route('account.edit', absolute: false))
        ->assertOk();
});

it('may accept an account update request with the same email', function () {
    $user = User::first();

    actingAs($user)
        ->put(route('account.update', absolute: false), [
            'name' => 'John Smith',
            'email' => $user->email,
        ])
        ->assertSessionHasNoErrors();
});

it('may accept an account update request with a new email', function () {
    Notification::fake();

    $user = User::first();

    actingAs($user)
        ->put(route('account.update', absolute: false), [
            'name' => 'John Smith',
            'email' => 'johnsmith@example.com',
        ])
        ->assertSessionHasNoErrors();

    Notification::assertSentTo($user, VerifyEmail::class);
});

it('may validate an account update request', function () {
    /** @var User $user */
    $user = User::factory()->createOne();

    actingAs($user)
        ->put(route('account.update', absolute: false), [
            'name' => 'Test User',
            'email' => 'test@example.com',
        ])
        ->assertSessionHasErrors('email');
});

it('may accept a destroy account request', function () {
    actingAs(User::first())
        ->delete(route('account.destroy', absolute: false), ['password' => 'password'])
        ->assertSessionHasNoErrors();

    assertGuest();
});

it('may validate a destroy account request', function () {
    actingAs(User::first())
        ->delete(route('account.destroy', absolute: false), ['password' => 'wrong_password'])
        ->assertSessionHasErrors('password');
});
