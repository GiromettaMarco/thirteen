<?php

namespace App\Http\Controllers;

use App\Http\Requests\Project\DestroyProjectsRequest;
use App\Http\Requests\Project\StoreProjectRequest;
use App\Models\Membership;
use App\Models\Project;
use App\Models\Team;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use Sliver\Format\FlashMessage;

class ProjectController extends Controller
{
    /**
     * Show all related projects.
     */
    public function index(Request $request, Team $team): Response
    {
        /** @var User $user */
        $user = $request->user();

        return Inertia::render('dashboard/projects/index', [
            'projects' => $team->projects()->get(),
            'team' => $team,
            'views' => [
                'projects' => $user->views()->where([
                    ['page', 'projects.index'],
                    ['table', "projects/team:$team->id"],
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
     * Show the project with related tasks.
     */
    public function show(
        Request $request,
        Team $team,
        Project $project
    ): Response {
        /** @var User $user */
        $user = $request->user();

        /** @var Membership $membership */
        $membership = $team->getRelation('pivot');

        return Inertia::render('dashboard/projects/show', [
            'permissions' => [
                'admin' => $membership->admin,
                'can_delete' => $membership->can_delete,
                'can_edit' => $membership->can_edit,
                'can_edit_members' => $membership->can_edit_members,
                'can_edit_projects' => $membership->can_edit_projects,
            ],
            'project' => $project,
            'tasks' => $project->tasks()->with('profile')->get(),
            'team_members' => $team->profiles()->get(),
            'views' => [
                'tasks' => $user->views()->where([
                    ['page', "projects.show/$project->id"],
                    ['table', 'tasks'],
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
     * Store a new project.
     */
    public function store(
        StoreProjectRequest $request,
        Team $team
    ): RedirectResponse {
        $team->projects()->create($request->validated());

        Inertia::flash('toast', new FlashMessage(__('strings.project.created'), 'success'));

        return back();
    }

    /**
     * Update an existing project.
     */
    public function update(
        StoreProjectRequest $request,
        Team $team,
        Project $project
    ): RedirectResponse {
        $project->update($request->validated());

        Inertia::flash('toast', new FlashMessage(__('strings.project.updated'), 'success'));

        return back();
    }

    /**
     * Delete a project.
     */
    public function destroy(
        Request $request,
        Team $team,
        Project $project
    ): RedirectResponse {
        $project->delete();

        Inertia::flash('toast', new FlashMessage(__('strings.project.deleted'), 'success'));

        return back();
    }

    /**
     * Delete many resources at once.
     */
    public function destroyMany(
        DestroyProjectsRequest $request,
        Team $team
    ): RedirectResponse {
        /** @var array<int> $ids */
        $ids = $request->validated('ids');

        // Delete all in one transaction
        DB::transaction(function () use ($ids, $team) {
            $team->projects->each(function (Project $project) use ($ids) {
                if (in_array($project->id, $ids)) {
                    $project->delete();
                }
            });
        });

        return back();
    }
}
