<?php

use App\Models\User;

use function Pest\Laravel\actingAs;

it('may reach the account page from the dashboard homepage')
    ->defer(fn () => actingAs(User::first()))
    ->visit('/dashboard')
    ->on()
    ->mobile()
    ->click('@toggle-sidebar')
    ->click('Test User')
    ->click('Account')
    ->assertTitleContains('Account');

it('may update the user email and require email verification to proceed')
    ->defer(fn () => actingAs(User::first()))
    ->visit('/dashboard/account')
    ->on()
    ->mobile()
    ->assertSee('Update email')
    ->fill('email', 'info@example.com')
    ->click('Save')
    ->assertSee('Account updated')
    ->assertTitleContains('Email verification');

it('may update the user password')
    ->defer(fn () => actingAs(User::first()))
    ->visit('/dashboard/account')->on()->mobile()
    ->assertSee('Update password')
    ->fill('current_password', 'password')
    ->fill('password', 'NewPassword_1234')
    ->fill('password_confirmation', 'NewPassword_1234')
    ->click('Change password')
    ->assertSee('Password updated');

it('may delete other browser sessions')
    ->defer(fn () => actingAs(User::first()))
    ->visit('/dashboard/account')
    ->on()
    ->mobile()
    ->assertSee('Browser Sessions')
    ->click('Log Out Other Browser Sessions')
    ->assertSee('Delete other browser sessions?')
    ->fill('password', 'password')
    ->click('Delete')
    ->assertSee('Browser sessions deleted');

it('may delete the account')
    ->defer(fn () => actingAs(User::first()))
    ->visit('/dashboard/account')
    ->on()
    ->mobile()
    ->assertSee('Delete account')
    ->click('@delete-account')
    ->assertSee('Are you sure you want to delete your account?')
    ->fill('password', 'password')
    ->click('Delete')
    ->assertTitleContains('Login');
