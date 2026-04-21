<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreInvitationRequest;
use App\Models\Invitation;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Sliver\Format\FlashMessage;

class InvitationController extends Controller
{
    /**
     * Show all invitations.
     */
    public function index(Request $request): Response
    {
        /** @var User */
        $user = $request->user();

        return Inertia::render('dashboard/invitations/index', [
            'invitations' => Invitation::with(['user', 'user.profile'])
                ->orderBy('created_at', 'DESC')
                ->get(),
            // @TODO add can_add_members policy check for each team
            'teams' => $user->profile->teams,
        ]);
    }

    /**
     * Store a new invitation.
     */
    public function store(StoreInvitationRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        /** @var User $user */
        $user = User::create([
            'email' => $validated['email'],
        ]);

        $user->profile()->create([
            'name' => $validated['name'],
            'public' => false,
            'role' => $validated['role'],
        ]);

        // Attach teams
        $teams = json_decode($validated['teams']);

        if (is_array($teams)) {
            // @TODO add can_add_members policy check for each team
            $user->profile->teams()->attach($teams);
        }

        // Invite
        $user->invitation()->create();

        $user->invite();

        Inertia::flash('toast', new FlashMessage(__('strings.invitation.created'), 'success'));

        return back();
    }

    /**
     * Renew an existing invitation.
     */
    public function update(Request $request, Invitation $invitation): RedirectResponse
    {
        $invitation->user->invite();

        $invitation->touch();

        Inertia::flash('toast', new FlashMessage(__('strings.invitation.updated'), 'success'));

        return back();
    }

    /**
     * Revoke an invitation.
     */
    public function destroy(Request $request, Invitation $invitation): RedirectResponse
    {
        $invitation->user->delete();

        Inertia::flash('toast', new FlashMessage(__('strings.invitation.deleted'), 'success'));

        return back();
    }
}
