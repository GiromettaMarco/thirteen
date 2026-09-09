<?php

use App\Events\UserDeleting;
use App\Models\Invitation;
use App\Models\User;
use App\Notifications\Invitation as InvitationNotification;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Notification;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\post;

it('may display the invitations index page', function () {
    $admin = User::where([
        'can_edit_users' => true,
        'can_view_users' => true,
    ])->first();

    actingAs($admin)
        ->get(route('invitations.index'))
        ->assertOk();
});

it('may negate access to non admin users to the invitations page', function () {
    $nonAdmin = User::where([
        'can_edit_users' => false,
        'can_view_users' => false,
    ])->first();

    actingAs($nonAdmin)
        ->get(route('invitations.index'))
        ->assertStatus(404);
});

it('may accept a create invitation request', function () {
    Notification::fake();

    $admin = User::where([
        'can_edit_users' => true,
        'can_view_users' => true,
    ])->first();

    actingAs($admin)
        ->post(route('invitations.store'), [
            'email' => 'newuser@example.com',
            'name' => 'New User',
            'role' => 'guest',
            'teams' => json_encode([$admin->current_team_id]),
        ])
        ->assertSessionHasNoErrors();

    $new_profile = $admin
        ->currentTeam
        ->profiles()
        ->firstWhere('name', 'New User');

    expect($new_profile)->not->toBeNull();
    expect($new_profile->user->invitation)->not->toBeNull();

    Notification::assertSentTo($new_profile->user, InvitationNotification::class);
});

it('may accept an update invitation request', function () {
    Notification::fake();

    $admin = User::where([
        'can_edit_users' => true,
        'can_view_users' => true,
    ])->first();

    actingAs($admin)
        ->post(route('invitations.store'), [
            'email' => 'newuser@example.com',
            'name' => 'New User',
            'role' => 'guest',
            'teams' => json_encode([$admin->current_team_id]),
        ])
        ->assertSessionHasNoErrors();

    $new_profile = $admin
        ->currentTeam
        ->profiles()
        ->firstWhere('name', 'New User');

    expect($new_profile)->not->toBeNull();

    Notification::assertSentTo($new_profile->user, InvitationNotification::class);

    actingAs($admin)
        ->put(route('invitations.update', [
            'invitation' => $new_profile->user->invitation->id,
        ]))
        ->assertSessionHasNoErrors();

    Notification::assertSentTo($new_profile->user, InvitationNotification::class);
});

it('may accept a delete invitation request', function () {
    Event::fake();
    Notification::fake();

    $admin = User::where([
        'can_edit_users' => true,
        'can_view_users' => true,
    ])->first();

    actingAs($admin)
        ->post(route('invitations.store'), [
            'email' => 'newuser@example.com',
            'name' => 'New User',
            'role' => 'guest',
            'teams' => json_encode([$admin->current_team_id]),
        ])
        ->assertSessionHasNoErrors();

    $new_profile = $admin
        ->currentTeam
        ->profiles()
        ->firstWhere('name', 'New User');

    expect($new_profile)->not->toBeNull();

    Notification::assertSentTo($new_profile->user, InvitationNotification::class);

    actingAs($admin)
        ->delete(route('invitations.destroy', [
            'invitation' => $new_profile->user->invitation->id,
        ]))
        ->assertSessionHasNoErrors();

    expect(
        Invitation::where('user_id', $new_profile->user->id)->first()
    )->toBeNull();

    Event::assertDispatched(UserDeleting::class);
});

it('may delete an invitation after the new user has set its password', function () {
    Notification::fake();

    $admin = User::where([
        'can_edit_users' => true,
        'can_view_users' => true,
    ])->first();

    actingAs($admin)
        ->post(route('invitations.store'), [
            'email' => 'newuser@example.com',
            'name' => 'New User',
            'role' => 'guest',
            'teams' => json_encode([$admin->current_team_id]),
        ])
        ->assertSessionHasNoErrors();

    $new_user = User::where('email', 'newuser@example.com')->first();

    $token = '';

    Notification::assertSentTo(
        $new_user,
        function (InvitationNotification $notification) use (&$token) {
            return (bool) ($token = $notification->token);
        }
    );

    Auth::logout();

    post(route('password.store', absolute: false), [
        'token' => $token,
        'email' => $new_user->email,
        'password' => 'New_Password_1234',
        'password_confirmation' => 'New_Password_1234',
    ])
        ->assertSessionHasNoErrors()
        ->assertRedirect(route('login'));

    expect($new_user->invitation)->toBeNull();
});
