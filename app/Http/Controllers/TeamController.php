<?php

namespace App\Http\Controllers;

use App\Http\Requests\Team\StoreTeamRequest;
use App\Models\Team;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Sliver\Format\FlashMessage;

class TeamController extends Controller
{
    /**
     * Show teams related to the current user.
     */
    public function index(Request $request): Response
    {
        /** @var User */
        $user = $request->user();

        return Inertia::render('dashboard/teams/index', [
            'teams' => $user
                ->profile
                ->teams()
                ->withCount(['profiles'])
                ->orderBy('updated_at', 'desc')
                ->get(),
            'views' => [
                'teams' => $user->views()->where([
                    ['page', 'teams.index'],
                    ['table', 'teams'],
                ])->first([
                    'filters',
                    'pagination',
                    'sorting',
                    'visibility',
                ]),
            ],
        ]);
    }

    /**
     * Show the team with related projects and users.
     */
    public function show(Request $request, Team $team): Response
    {
        /** @var User */
        $user = $request->user();

        return Inertia::render('dashboard/teams/show', [
            'members' => $team
                ->profiles()
                // ->withCount([
                //     'projects' => function ($query) use ($team) {
                //         $query->where('team_id', $team->id);
                //     },
                //     'tasks' => function ($query) use ($team) {
                //         $query->where('team_id', $team->id);
                //     },
                // ])
                ->get(),
            'projects' => $team->projects()->get(),
            'team' => $team,
            'views' => [
                // @TODO merge queries
                'members' => $user->views()->where([
                    ['page', "teams.show/$team->id"],
                    ['table', 'members'],
                ])->first([
                    'filters',
                    'pagination',
                    'sorting',
                    'visibility',
                ]),
                'projects' => $user->views()->where([
                    ['page', "teams.show/$team->id"],
                    ['table', 'projects'],
                ])->first([
                    'filters',
                    'pagination',
                    'sorting',
                    'visibility',
                ]),
            ],
        ]);
    }

    /**
     * Store a new team.
     */
    public function store(StoreTeamRequest $request): RedirectResponse
    {
        /** @var User */
        $user = $request->user();

        $team = $user->profile->teams()->create(
            $request->validated(),
            [
                'admin' => true,
                'can_edit' => true,
                'can_delete' => true,
            ]
        );

        // Set current team if missing
        if ($user->current_team_id === null) {
            $user->currentTeam()->associate($team->id);
            $user->save();
        }

        Inertia::flash('toast', new FlashMessage(__('strings.team.created'), 'success'));

        return back();
    }

    /**
     * Update an existing team.
     */
    public function update(StoreTeamRequest $request, Team $team): RedirectResponse
    {
        $team->update($request->validated());

        Inertia::flash('toast', new FlashMessage(__('strings.team.updated'), 'success'));

        return back();
    }

    /**
     * Delete a team.
     */
    public function destroy(Request $request, Team $team): RedirectResponse
    {
        $team->delete();

        Inertia::flash('toast', new FlashMessage(__('strings.team.deleted'), 'success'));

        return back();
    }
}
