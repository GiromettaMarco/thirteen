<?php

use App\Models\User;

use function Pest\Laravel\actingAs;

it('may reach the profile page from the dashboard homepage')
    ->defer(fn () => actingAs(User::first()))
    ->visit('/dashboard')
    ->on()
    ->mobile()
    ->click('@toggle-sidebar')
    ->click('Test User')
    ->click('Profile')
    ->assertTitleContains('profile');

it('may update the user profile')
    ->defer(fn () => actingAs(User::first()))
    ->visit('/dashboard/profile/1')
    ->on()
    ->mobile()
    ->click('Edit')
    ->fill('name', 'John Smith')
    ->click('Project Manager')
    ->click('Public profile')
    ->click('Save')
    // @NOTE currently pest selectors don't support tag names
    ->assertSeeIn('@main', 'John Smith')
    ->assertSeeIn('@main', 'manager')
    ->assertSeeIn('@main', 'public');
