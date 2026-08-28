<?php

use App\Http\Controllers\Account\AccountController;
use App\Http\Controllers\Account\OtherSessionsController;
use App\Http\Controllers\Account\PasswordController;
use App\Http\Controllers\CurrentTeamController;
use App\Http\Controllers\InvitationController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\TeamMemberController;
use App\Http\Controllers\ViewController;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::prefix('dashboard')
    ->middleware(['auth', 'auth.session', 'verified'])
    ->group(function () {
        // #region Dashboard
        Route::get('/', function () {
            return Inertia::render('dashboard/index');
        })->name('dashboard');
        Route::post('/views', [ViewController::class, 'store'])
            ->name('views.store');
        Route::get('/settings', function () {
            return Inertia::render('dashboard/settings');
        })->name('settings');

        // #region Account
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

        // #region Profile and Users
        Route::get('/profile/{profile}', [ProfileController::class, 'show'])
            ->can('view', 'profile')
            ->name('profile.show');
        Route::put('/profile/{profile}', [ProfileController::class, 'update'])
            ->can('update', 'profile')
            ->name('profile.update');

        // #region Invitations
        Route::get('/invitations', [InvitationController::class, 'index'])
            ->can('viewAny', User::class)
            ->name('invitations.index');
        Route::post('/invitations', [InvitationController::class, 'store'])
            ->can('create', User::class)
            ->name('invitations.store');
        Route::put('/invitations/{invitation}', [InvitationController::class, 'update'])
            ->can('update', User::class)
            ->name('invitations.update');
        Route::delete('/invitations/{invitation}', [InvitationController::class, 'destroy'])
            ->can('delete', User::class)
            ->name('invitations.destroy');

        // #region Teams
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

        // #region Team members
        Route::get('/teams/{team}/member/{profile}', [TeamMemberController::class, 'show'])
            ->scopeBindings()
            ->name('members.show');
        Route::put('/teams/{team}/member/{profile}', [TeamMemberController::class, 'update'])
            ->scopeBindings()
            ->can('editMembers', 'team')
            ->name('members.update');

        // #region Projects
        Route::get('/teams/{team}/projects', [ProjectController::class, 'index'])
            ->name('projects.index');
        Route::get('/teams/{team}/projects/{project}', [ProjectController::class, 'show'])
            ->scopeBindings()
            ->name('projects.show');
        Route::post('/teams/{team}/projects', [ProjectController::class, 'store'])
            ->scopeBindings()
            ->can('editProjects', 'team')
            ->name('projects.store');
        Route::put('/teams/{team}/projects/{project}', [ProjectController::class, 'update'])
            ->scopeBindings()
            ->can('editProjects', 'team')
            ->name('projects.update');
        Route::delete('/teams/{team}/projects/{project}', [ProjectController::class, 'destroy'])
            ->scopeBindings()
            ->can('editProjects', 'team')
            ->name('projects.destroy');
        Route::delete('/teams/{team}/projects', [ProjectController::class, 'destroyMany'])
            ->can('editProjects', 'team')
            ->name('projects.destroy-many');

        // #region Tasks
        Route::post('/teams/{team}/projects/{project}/tasks', [TaskController::class, 'store'])
            ->scopeBindings()
            ->can('editProjects', 'team')
            ->name('tasks.store');
        Route::put('/teams/{team}/projects/{project}/tasks/{task}', [TaskController::class, 'update'])
            ->scopeBindings()
            ->can('editProjects', 'team')
            ->name('tasks.update');
        Route::delete('/teams/{team}/projects/{project}/tasks/{task}', [TaskController::class, 'destroy'])
            ->scopeBindings()
            ->can('editProjects', 'team')
            ->name('tasks.destroy');
        Route::delete('/teams/{team}/projects/{project}/tasks', [TaskController::class, 'destroyMany'])
            ->scopeBindings()
            ->can('editProjects', 'team')
            ->name('tasks.destroy-many');
    });
