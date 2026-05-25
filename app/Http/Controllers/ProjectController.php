<?php

namespace App\Http\Controllers;

use App\Http\Requests\Project\StoreProjectRequest;
use App\Models\Project;
use App\Models\Team;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
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
                    ['table', "team-$team->id.projects"],
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
     * Show all related projects.
     */
    public function show(
        Request $request,
        Team $team,
        Project $project
    ): Response {
        return Inertia::render('dashboard/projects/show', [
            'project' => $project,
        ]);
    }

    /**
     * Store a new project.
     */
    public function store(
        StoreProjectRequest $request,
        Team $team
    ): RedirectResponse {
        /** @var User */
        $user = $request->user();

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
}
