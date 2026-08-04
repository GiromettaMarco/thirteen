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
            'password' => 'New_Password_1234',
            'password_confirmation' => 'New_Password_1234',
        ])
        ->assertSessionHasNoErrors();

    Event::assertDispatched(OtherDeviceLogout::class);
    Event::assertDispatched(PasswordUpdatedViaController::class);
});

it('may validate a password update request', function () {
    actingAs(User::first())
        ->put(route('password.update', absolute: false), [
            'current_password' => 'wrong_password',
            'password' => 'New_Password_1234',
            'password_confirmation' => 'New_Password_1234',
        ])
        ->assertSessionHasErrors('current_password');
});
