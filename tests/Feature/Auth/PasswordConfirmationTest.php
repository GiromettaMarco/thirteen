<?php

use App\Models\User;

use function Pest\Laravel\actingAs;

it('may display the confirm password page', function () {
    actingAs(User::first())
        ->get(route('password.confirm', absolute: false))
        ->assertOk();
});

it('may accept a confirm password request', function () {
    $user = User::first();

    actingAs($user)
        ->post(route('password.validate', absolute: false), [
            'email' => $user->email,
            'password' => 'AJf$hj7jn&bdMc',
        ])
        ->assertSessionHasNoErrors()
        ->assertSessionHas('auth.password_confirmed_at');
});

it('may validate confirm password requests', function () {
    $user = User::first();

    actingAs($user)
        ->post(route('password.validate', absolute: false), [
            'email' => $user->email,
            'password' => 'wrong_password',
        ])
        ->assertSessionHasErrors('password');
});
