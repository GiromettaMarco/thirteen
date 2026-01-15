<?php

use App\Models\User;

use function Pest\Laravel\actingAs;

it('may sign in the user through the login form')
    ->visit('/')
    ->on()
    ->mobile()
    ->click("Let's get started!")
    ->assertUrlIs('*/login')
    ->assertSee('Log in to your account')
    ->fill('email', 'test@example.com')
    ->fill('password', 'password')
    ->click('Sign In')
    ->assertUrlIs('*/dashboard');

it('may validate and throttle login attempts')
    ->visit('/login')
    ->on()
    ->mobile()
    ->fill('email', 'test@example.com')
    ->fill('password', 'wrong_password')
    ->click('Sign In')
    ->assertSee('These credentials do not match our records.')
    ->click('Sign In')
    ->click('Sign In')
    ->click('Sign In')
    ->click('Sign In')
    ->click('Sign In')
    ->assertSee('Too many attempts.');

it('may sign out the user from the dashboard')
    ->defer(fn () => actingAs(User::first()))
    ->visit('/dashboard')
    ->on()
    ->mobile()
    ->click('@toggle-sidebar')
    ->click('Test User')
    ->click('Sign Out')
    ->assertTitleContains('Laravel 13 example application');
