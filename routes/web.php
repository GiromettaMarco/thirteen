<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

require __DIR__.'/auth.php';
require __DIR__.'/dashboard.php';

Route::fallback(function () {
    return Inertia::render('errors/404')
        ->toResponse(request())
        ->setStatusCode(404);
});
