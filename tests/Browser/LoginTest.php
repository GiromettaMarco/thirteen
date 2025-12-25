<?php

use App\Events\UserLoggedIn;
use App\Models\User;
use Illuminate\Support\Facades\Event;

use function Pest\Laravel\assertAuthenticated;

it('may sign in the user', function () {
    Event::fake();

    User::factory()->create([
        'email' => 'nuno@laravel.com',
        'password' => 'password',
    ]);

    $page = visit('/')->on()->mobile();

    $page->click('Login')
        ->assertUrlIs('*/login')
        ->assertSee('Log in to your account')
        ->fill('email', 'nuno@laravel.com')
        ->fill('password', 'password')
        ->click('@login-submit')
        ->assertSee('Dashboard');

    assertAuthenticated();

    Event::assertDispatched(UserLoggedIn::class);
});
