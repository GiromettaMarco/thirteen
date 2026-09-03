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
    | - verification: Require email verification for new users. Remember to
    |   add/remove the MustVerifyEmail contract to the User model and the
    |   'verified' middleware to the dashboard route group.
    | - verify_on_reset: Verify the user email after a password reset.
    |
    */

    'auth' => [
        'register' => true,
        'reset' => true,
        'verification' => true,
        'verify_on_reset' => true,
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
        'sidebar' => env('COOKIE_SIDEBAR', 'sidebar'),
    ],
];
