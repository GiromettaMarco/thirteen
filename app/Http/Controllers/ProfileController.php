<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateProfileRequest;
use App\Models\Profile;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Sliver\Format\FlashMessage;

class ProfileController extends Controller
{
    /**
     * Display the profile page.
     */
    public function show(Request $request, Profile $profile): Response
    {
        /** @var User */
        $user = $request->user();

        return Inertia::render('dashboard/profile', [
            'canEdit' => $user->can('update', $profile),
            'profile' => $profile,
        ]);
    }

    /**
     * Update profile data.
     */
    public function update(UpdateProfileRequest $request, Profile $profile): RedirectResponse
    {
        $profile->update($request->validated());

        Inertia::flash('toast', new FlashMessage(__('strings.profile.updated'), 'success'));

        return back();
    }
}
