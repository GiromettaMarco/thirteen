<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\PasswordEmailRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Config;
use Inertia\Inertia;
use Inertia\Response;

class PasswordResetLinkController extends Controller
{
    /**
     * Show the password reset link request page.
     */
    public function create(): Response
    {
        if (! Config::get('custom.auth.reset')) {
            abort(403);
        }

        return Inertia::render('auth/forgot-password');
    }

    /**
     * Handle an incoming password reset link request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(PasswordEmailRequest $request): RedirectResponse
    {
        $request->sendLink();

        return back();
    }
}
