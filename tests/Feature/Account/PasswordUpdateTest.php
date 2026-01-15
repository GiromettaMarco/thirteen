<?php

use App\Events\PasswordUpdatedViaController;
use App\Models\User;
use Illuminate\Auth\Events\OtherDeviceLogout;
use Illuminate\Support\Facades\Event;

use function Pest\Laravel\actingAs;

it('may accept a password update request', function () {
    Event::fake();

    actingAs(User::first())
        ->put(route('password.update', absolute: false), [
            'current_password' => 'password',
            'password' => 'new_password',
            'password_confirmation' => 'new_password',
        ])
        ->assertSessionHasNoErrors();

    Event::assertDispatched(OtherDeviceLogout::class);
    Event::assertDispatched(PasswordUpdatedViaController::class);
});

it('may validate a password update request', function () {
    actingAs(User::first())
        ->put(route('password.update', absolute: false), [
            'current_password' => 'wrong_password',
            'password' => 'new_password',
            'password_confirmation' => 'new_password',
        ])
        ->assertSessionHasErrors('current_password');
});
