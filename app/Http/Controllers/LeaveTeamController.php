<?php

namespace App\Http\Controllers;

use App\Events\TeamMemberRemoved;
use App\Models\Team;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Sliver\Format\FlashMessage;

class LeaveTeamController extends Controller
{
    public function destroy(
        Request $request,
        Team $team
    ): RedirectResponse {
        $user = $request->user();

        if ($user instanceof User) {
            $team->profiles()->detach($user->profile->id);

            // Dispatch event
            TeamMemberRemoved::dispatch($team, $user);

            Inertia::flash('toast', new FlashMessage(__('strings.leave_team'), 'success'));
        }

        return to_route('teams.index');
    }
}
