<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Auth
    |--------------------------------------------------------------------------
    |
    | List of enabled authentication features
    | - register: Allow self registration of new users
    | - reset: Allow registered users to reset their password using the forgot
    |   password form.
    |
    */

    'auth' => [
        'register' => true,
        'reset' => true,
    ],

    /*
    |--------------------------------------------------------------------------
    | Cookies
    |--------------------------------------------------------------------------
    |
    | List of cookie names used by the application.
    |
    */

    'cookie' => [
        'appearance' => env('COOKIE_APPEARANCE', 'appearance'),
        'locale' => env('COOKIE_LOCALE', 'locale'),
    ],

    /*
    |--------------------------------------------------------------------------
    | Verify Email on Password Reset
    |--------------------------------------------------------------------------
    |
    | When the user performs a password reset, they are asked to follow a
    | password reset link sent to their email. If verify_on_reset is 'true',
    | completing the password reset process will also mark the user email
    | as verified.
    |
    | This is mostly useful when adding users throught invitation.
    |
    */

    'verify_on_reset' => true,

];
