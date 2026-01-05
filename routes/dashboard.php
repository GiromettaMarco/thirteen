<?php

use App\Http\Controllers\Account\AccountController;
use App\Http\Controllers\Account\OtherSessionsController;
use App\Http\Controllers\Account\PasswordController;
use App\Http\Controllers\InvitationController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TeamController;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::prefix('dashboard')
    ->middleware(['auth', 'verified'])
    ->group(function () {
        // Dashboard
        Route::get('/', function () {
            return Inertia::render('dashboard/index');
        })->name('dashboard');

        // Settings
        Route::get('/settings', function () {
            return Inertia::render('dashboard/settings');
        })->name('settings');

        // Account
        Route::get('/account', [AccountController::class, 'edit'])
            ->name('account.edit');
        Route::put('/account', [AccountController::class, 'update'])
            ->name('account.update');
        Route::put('/account/password', [PasswordController::class, 'update'])
            ->name('password.update');
        Route::delete('/account/sessions', [OtherSessionsController::class, 'destroy'])
            ->name('sessions.destroy');
        Route::delete('/account', [AccountController::class, 'destroy'])
            ->name('account.destroy');

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
