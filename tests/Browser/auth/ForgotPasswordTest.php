<?php

it('may accept a forgot password submission')
    ->visit('/forgot-password')
    ->on()
    ->mobile()
    ->assertSee('Forgot password')
    ->fill('email', 'test@example.com')
    ->pressAndWaitFor('Send password reset link', 1)
    ->assertSee('A reset link will be sent if the account exists.');

it('may validate and throttle forgot password submissions')
    ->visit('/forgot-password')
    ->on()
    ->mobile()
    ->assertSee('Forgot password')
    ->fill('email', 'test@example.com')
    ->click('Send password reset link')
    ->assertSee('A reset link will be sent if the account exists.')
    ->fill('email', 'test@example.com')
    ->click('Send password reset link')
    ->assertSee('Too many attempts.');
