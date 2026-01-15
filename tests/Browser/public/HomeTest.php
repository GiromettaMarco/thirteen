<?php

it('may welcome the user')
    ->visit('/')
    ->assertSee('Welcome to Thirteen');

it('may navigate the mobile menu')
    ->visit('/')
    ->on()
    ->mobile()
    ->click('@open-mobile-menu')
    ->click('Dashboard')
    ->assertUrlIs('*/login');
