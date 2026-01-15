<?php

use App\Models\User;
use Illuminate\Auth\Events\OtherDeviceLogout;
use Illuminate\Support\Facades\Event;

use function Pest\Laravel\actingAs;

it('may accept a destroy other sessions request', function () {
    Event::fake();

    actingAs(User::first())
        ->delete(route('sessions.destroy', absolute: false), [
            'password' => 'password',
        ])
        ->assertSessionHasNoErrors();

    Event::assertDispatched(OtherDeviceLogout::class);
});

it('may validate a destroy other sessions request', function () {
    actingAs(User::first())
        ->delete(route('sessions.destroy', absolute: false), [
            'password' => 'wrong_password',
        ])
        ->assertSessionHasErrors('password');
});
