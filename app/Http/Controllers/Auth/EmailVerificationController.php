<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\VerificationSendRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Inertia\Inertia;
use Inertia\Response;
use Sliver\Format\FlashMessage;

class EmailVerificationController extends Controller
{
    /**
     * Show the email verification prompt page.
     */
    public function create(Request $request): Response|RedirectResponse
    {
        if (! Config::get('custom.auth.verification')) {
            abort(403);
        }

        /** @var User */
        $user = $request->user();

        return $user->hasVerifiedEmail()
            ? redirect()->intended(route('dashboard', absolute: false))
            : Inertia::render('auth/verify-email');
    }

    /**
     * Send a new email verification notification.
     */
    public function store(VerificationSendRequest $request): RedirectResponse
    {
        /** @var User */
        $user = $request->user();

        if ($user->hasVerifiedEmail()) {
            return redirect()->intended(route('dashboard', absolute: false));
        }

        $request->sendEmail();

        Inertia::flash('toast', new FlashMessage([
            'title' => __('strings.email_sent'),
            'description' => __('strings.auth.verify_email'),
            'level' => 'success',
        ]));

        return back();
    }
}
