<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('public/home');
})->name('home');

Route::get('/forms', function () {
    return Inertia::render('public/forms');
})->name('forms');

Route::get('/authentication', function () {
    return Inertia::render('public/authentication');
})->name('authentication');
