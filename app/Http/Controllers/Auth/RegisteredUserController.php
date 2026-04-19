<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Config;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use Sliver\Format\FlashMessage;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        if (! Config::get('custom.auth.register')) {
            abort(403);
        }

        return Inertia::render('auth/register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws ValidationException
     */
    public function store(RegisterRequest $request): RedirectResponse
    {
        $request->register();

        Inertia::flash('toast', new FlashMessage(__('strings.auth.registered'), 'success'));

        return to_route('dashboard');
    }
}
