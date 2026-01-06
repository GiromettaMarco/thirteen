<?php

namespace App\Http\Controllers\Account;

use App\Http\Controllers\Controller;
use App\Http\Requests\Account\DestroyOtherSessionsRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Sliver\Format\FlashMessage;

class OtherSessionsController extends Controller
{
    /**
     * Delete all of the account's sessions different from the current one.
     */
    public function destroy(DestroyOtherSessionsRequest $request): RedirectResponse
    {
        Auth::logoutOtherDevices($request->password);

        if (config('session.driver') === 'database') {
            DB::connection(config('session.connection'))->table(config('session.table', 'sessions'))
                ->where('user_id', $request->user()->getAuthIdentifier())
                ->where('id', '!=', $request->session()->getId())
                ->delete();
        }

        Inertia::flash('toast', new FlashMessage([
            'title' => __('strings.account.sessions_deleted.title'),
            'description' => __('strings.account.sessions_deleted.description'),
            'level' => 'success',
        ]));

        return back();
    }
}
