<?php

namespace App\Http\Controllers\Account;

use App\Helpers\Agent;
use App\Http\Controllers\Controller;
use App\Http\Requests\Account\DestroyAccountRequest;
use App\Http\Requests\Account\UpdateAccountRequest;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use Sliver\Format\FlashMessage;

class AccountController extends Controller
{
    /**
     * Show edit account page.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('dashboard/account', [
            'sessions' => $this->sessions($request)->all(),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(UpdateAccountRequest $request): RedirectResponse
    {
        /** @var User $user */
        $user = $request->user();

        $user->email = $request->validated('email');

        if ($user->isDirty() && $user instanceof MustVerifyEmail) {
            $user->forceFill([
                'email_verified_at' => null,
            ]);

            $user->sendEmailVerificationNotification();
        }

        $user->save();

        Inertia::flash('toast', new FlashMessage(__('strings.account.updated'), 'success'));

        return back();
    }

    /**
     * Delete the user's account.
     */
    public function destroy(DestroyAccountRequest $request): RedirectResponse
    {
        // Cache user before logout
        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        Inertia::flash('toast', new FlashMessage(__('strings.account.deleted'), 'warning'));

        return to_route('login');
    }

    /**
     * Get active sessions for the authenticated user.
     *
     * @return \Illuminate\Support\Collection
     */
    public function sessions(Request $request)
    {
        if (config('session.driver') !== 'database') {
            return collect();
        }

        return collect(
            DB::connection(config('session.connection'))
                ->table(config('session.table', 'sessions'))
                ->where('user_id', $request->user()->getAuthIdentifier())
                ->orderBy('last_activity', 'desc')
                ->get()
        )->map(function ($session) use ($request) {
            $agent = $this->createAgent($session);

            return (object) [
                'agent' => [
                    'is_desktop' => $agent->isDesktop(),
                    'platform' => $agent->platform(),
                    'browser' => $agent->browser(),
                ],
                'ip_address' => $session->ip_address,
                'is_current_device' => $session->id === $request->session()->getId(),
                'last_active' => Carbon::createFromTimestamp($session->last_activity)
                    ->diffForHumans(syntax: ['locale' => App::currentLocale()]),
            ];
        });
    }

    /**
     * Create a new agent instance from the given session.
     *
     * @param  mixed  $session
     * @return \App\Helpers\Agent
     */
    protected function createAgent($session)
    {
        return tap(new Agent, fn ($agent) => $agent->setUserAgent($session->user_agent));
    }
}
