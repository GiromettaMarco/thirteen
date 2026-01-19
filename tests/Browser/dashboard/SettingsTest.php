<?php

use App\Models\User;

use function Pest\Laravel\actingAs;

it('may reach the settings page from the dashboard homepage')
    ->defer(fn () => actingAs(User::first()))
    ->visit('/dashboard')
    ->on()
    ->mobile()
    ->click('@toggle-sidebar')
    ->click('Settings')
    ->assertTitleContains('Settings');

it('may change language from the settings page')
    ->defer(fn () => actingAs(User::first()))
    ->visit('/dashboard/settings')
    ->on()
    ->mobile()
    ->assertSee('Language settings')
    ->click('English - EN')
    ->click('Italiano - IT')
    ->assertSee('Impostazioni della lingua');

it('may change appearance from the settings page')
    ->defer(fn () => actingAs(User::first()))
    ->visit('/dashboard/settings')
    ->on()
    ->mobile()
    ->assertSee('Appearance settings')
    ->click('System')
    ->click('Dark')
    // @NOTE currently pest selectors don't support tag names
    ->assertSourceHas('<html lang="en" class="dark">');
