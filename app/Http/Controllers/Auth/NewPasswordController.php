<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\NewPasswordRequest;
use App\Models\User;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use Sliver\Format\FlashMessage;

class NewPasswordController extends Controller
{
    /**
     * Show the password reset page.
     */
    public function create(Request $request): Response
    {
        if (! Config::get('custom.auth.reset')) {
            abort(403);
        }

        return Inertia::render('auth/reset-password', [
            'email' => $request->email,
            'token' => $request->route('token'),
        ]);
    }

    /**
     * Handle an incoming new password request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(NewPasswordRequest $request): RedirectResponse
    {
        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function (User $user) use ($request) {
                // Verify the user email if set in config
                $verifyEmail = Config::get('custom.verify_on_reset', true) && ! $user->hasVerifiedEmail();

                $saved = $user->forceFill([
                    'password' => Hash::make($request->password),
                    'remember_token' => Str::random(60),
                    ...($verifyEmail ? ['email_verified_at' => $user->freshTimestamp()] : []),
                ])->save();

                if ($saved) {
                    event(new PasswordReset($user));

                    if ($verifyEmail) {
                        event(new Verified($user));
                    }
                }
            }
        );

        // Success
        if ($status == Password::PASSWORD_RESET) {
            Inertia::flash('toast', new FlashMessage(__($status), 'success'));

            return to_route('login');
        }

        // Fail
        throw ValidationException::withMessages([
            'email' => [__($status)],
        ]);
    }
}
