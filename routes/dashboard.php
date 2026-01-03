<?php

use App\Http\Controllers\InvitationController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TeamController;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::prefix('dashboard')
    ->middleware(['auth', 'verified'])
    ->group(function () {
        Route::get('/', function () {
            return Inertia::render('dashboard/index');
        })->name('dashboard');

        // Settings
        Route::get('/settings', function () {
            return Inertia::render('dashboard/settings');
        })->name('settings');

        // Invitations
        Route::get('/invitations', [InvitationController::class, 'index'])
            ->can('viewAny', User::class)
            ->name('invitations.index');

        // Teams
        Route::get('/teams', [TeamController::class, 'index'])
            ->name('teams.index');
        Route::get('/teams/{team}', [TeamController::class, 'show'])
            ->name('teams.show');

        // Projects
        Route::get('/teams/{team}/projects', [ProjectController::class, 'index'])
            ->name('projects.index');
    });
