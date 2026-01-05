<?php

namespace App\Http\Controllers\Account;

use App\Events\PasswordUpdatedViaController;
use App\Http\Controllers\Controller;
use App\Http\Requests\Account\UpdatePasswordRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Inertia\Inertia;
use Sliver\Format\FlashMessage;

class PasswordController extends Controller
{
    /**
     * Update the user's password.
     */
    public function update(UpdatePasswordRequest $request): RedirectResponse
    {
        /** @var User $user */
        $user = $request->user();

        Auth::logoutOtherDevices($request->validated('current_password'));

        $user->forceFill([
            'password' => Hash::make($request->validated('password')),
        ])->save();

        Password::deleteToken($user);

        event(new PasswordUpdatedViaController($user));

        Inertia::flash('toast', new FlashMessage(__('strings.account.password_updated'), 'success'));

        return back();
    }
}
