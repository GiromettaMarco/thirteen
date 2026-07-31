<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateCurrentTeamRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Sliver\Format\FlashMessage;

class CurrentTeamController extends Controller
{
    /**
     * Update current team form the authenticated user.
     */
    public function update(UpdateCurrentTeamRequest $request): RedirectResponse
    {
        /** @var User */
        $user = $request->user();

        $user->currentTeam()->associate($request->validated('id'));

        $user->save();

        Inertia::flash('toast', new FlashMessage([
            'title' => __('strings.current_team.updated.title'),
            'description' => __('strings.current_team.updated.description'),
            'level' => 'success',
        ]));

        return back();
    }
}
