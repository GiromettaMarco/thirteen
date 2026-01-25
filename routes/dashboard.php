<?php

use App\Http\Controllers\Account\AccountController;
use App\Http\Controllers\Account\OtherSessionsController;
use App\Http\Controllers\Account\PasswordController;
use App\Http\Controllers\CurrentTeamController;
use App\Http\Controllers\InvitationController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\TeamMemberController;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::prefix('dashboard')
    ->middleware(['auth', 'auth.session', 'verified'])
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

        // Profile and Users
        Route::get('/profile/{profile}', [ProfileController::class, 'show'])
            ->can('view', 'profile')
            ->name('profile.show');
        Route::put('/profile/{profile}', [ProfileController::class, 'update'])
            ->can('update', 'profile')
            ->name('profile.update');

        // Invitations
        Route::get('/invitations', [InvitationController::class, 'index'])
            ->can('viewAny', User::class)
            ->name('invitations.index');

        // Teams
        Route::put('/current-team', [CurrentTeamController::class, 'update'])
            ->name('current-team.update');
        Route::get('/teams', [TeamController::class, 'index'])
            ->name('teams.index');
        Route::get('/teams/{team}', [TeamController::class, 'show'])
            ->name('teams.show');
        Route::post('/teams', [TeamController::class, 'store'])
            ->name('teams.store');
        Route::put('/teams/{team}', [TeamController::class, 'update'])
            ->can('update', 'team')
            ->name('teams.update');
        Route::delete('/teams/{team}', [TeamController::class, 'destroy'])
            ->can('delete', 'team')
            ->name('teams.destroy');

        // Team members
        Route::get('/teams/{team}/member/{profile}', [TeamMemberController::class, 'show'])
            ->scopeBindings()
            ->name('members.show');
        Route::put('/teams/{team}/member/{profile}', [TeamMemberController::class, 'update'])
            ->scopeBindings()
            ->can('editMembers', 'team')
            ->name('members.update');

        // Projects
        Route::get('/teams/{team}/projects', [ProjectController::class, 'index'])
            ->name('projects.index');
    });
