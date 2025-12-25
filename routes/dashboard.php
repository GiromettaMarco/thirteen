<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::prefix('dashboard')
    ->middleware(['auth', 'verified'])
    ->group(function () {
        Route::get('/', function () {
            return Inertia::render('dashboard/index');
        })->name('dashboard');
    });
