<?php

it('may welcome the user', function () {
    $page = visit('/');

    $page->assertSee("Let's get started!");
});
