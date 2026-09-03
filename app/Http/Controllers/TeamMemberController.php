<?php

namespace App\Http\Controllers;

use App\Events\TeamMemberRemoved;
use App\Http\Requests\TeamMember\StoreTeamMemberRequest;
use App\Models\Profile;
use App\Models\Team;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Sliver\Format\FlashMessage;

class TeamMemberController extends Controller
{
    /**
     * Show the team member profile.
     */
    public function show(
        Request $request,
        Team $team,
        Profile $profile
    ): Response {
        // Takes about the same time as using "WhereIn" and "GroupBy"
        $tasks = $profile->tasks()->get(['status', 'priority']);

        $tasks_count = [
            'todo' => [
                'low' => 0,
                'medium' => 0,
                'high' => 0,
            ],
            'in_progress' => [
                'low' => 0,
                'medium' => 0,
                'high' => 0,
            ],
            'done' => [
                'low' => 0,
                'medium' => 0,
                'high' => 0,
            ],
            'other' => [
                'low' => 0,
                'medium' => 0,
                'high' => 0,
            ],
        ];

        $tasks->each(function ($task) use (&$tasks_count) {
            $group = 'other';

            if (in_array($task->status->value, ['todo', 'in_progress', 'done'])) {
                $group = $task->status->value;
            }

            $tasks_count[$group][$task->priority->value]++;
        });

        return Inertia::render('dashboard/teams/members/show', [
            'profile' => $profile,
            'tasksCount' => $tasks_count,
            'team' => $team,
        ]);
    }

    /**
     * Attach a new member to the team.
     */
    public function store(
        StoreTeamMemberRequest $request,
        Team $team
    ): RedirectResponse {
        $admin = $request->boolean('admin');

        $team->profiles()->attach($request->validated('profile_id'), [
            'admin' => $admin,
            'can_delete_team' => $admin || $request->boolean('can_delete_team'),
            'can_edit_members' => $admin || $request->boolean('can_edit_members'),
            'can_edit_projects' => $admin || $request->boolean('can_edit_projects'),
            'can_edit_team' => $admin || $request->boolean('can_edit_team'),
        ]);

        Inertia::flash('toast', new FlashMessage(__('strings.team_member.created'), 'success'));

        return back();
    }

    /**
     * Update an existing team member.
     */
    public function update(
        Request $request,
        Team $team,
        Profile $profile
    ): RedirectResponse {
        $admin = $request->boolean('admin');

        $data = [
            'admin' => $admin,
            'can_delete_team' => $admin || $request->boolean('can_delete_team'),
            'can_edit_members' => $admin || $request->boolean('can_edit_members'),
            'can_edit_projects' => $admin || $request->boolean('can_edit_projects'),
            'can_edit_team' => $admin || $request->boolean('can_edit_team'),
        ];

        $team->profiles()->updateExistingPivot($profile, $data);

        Inertia::flash('toast', new FlashMessage(__('strings.team_member.updated'), 'success'));

        return back();
    }

    /**
     * Detach a member from the team.
     */
    public function destroy(
        Request $request,
        Team $team,
        Profile $profile
    ): RedirectResponse {
        $team->profiles()->detach($profile);

        // Dispatch event
        TeamMemberRemoved::dispatch($team, $profile->user);

        Inertia::flash('toast', new FlashMessage(__('strings.team_member.deleted'), 'success'));

        return back();
    }
}
