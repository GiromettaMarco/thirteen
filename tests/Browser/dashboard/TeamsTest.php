<?php

use App\Models\User;

use function Pest\Laravel\actingAs;

it('may reach the teams index page from the dashboard homepage')
    ->defer(fn () => actingAs(User::first()))
    ->visit('/dashboard')
    ->on()
    ->mobile()
    ->click('@toggle-sidebar')
    ->click('Teams')
    ->assertTitleContains('Teams');

it('may change the current team')
    ->defer(fn () => actingAs(User::first()))
    ->visit('/dashboard/teams')
    ->on()
    ->mobile()
    ->click('@set-current-team-2')
    ->assertSee('Current team changed');

it('may create a new team')
    ->defer(fn () => actingAs(User::first()))
    ->visit('/dashboard/teams')
    ->on()
    ->mobile()
    ->click('Add')
    ->fill('name', 'New Team')
    ->click('Submit')
    ->assertSee('Team created');

it('may update a team from the teams index')
    ->defer(fn () => actingAs(User::first()))
    ->visit('/dashboard/teams')
    ->on()
    ->mobile()
    ->click('@team-1-actions')
    ->click('Edit')
    ->fill('name', 'Another team name')
    ->click('Submit')
    ->assertSee('Team updated');

it('may delete a team from the teams index')
    ->defer(fn () => actingAs(User::first()))
    ->visit('/dashboard/teams')
    ->on()
    ->mobile()
    ->click('@team-1-actions')
    ->click('Delete')
    ->click('Delete')
    ->assertSee('Team deleted');
