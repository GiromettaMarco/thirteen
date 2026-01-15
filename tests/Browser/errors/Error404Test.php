<?php

it('may display a 404 page')
    ->visit('/nowhere')
    ->on()
    ->mobile()
    ->assertSee('Page not found');
