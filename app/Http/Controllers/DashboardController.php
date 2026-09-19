<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(Request $request): Response
    {
        /** @var User */
        $user = $request->user();

        $team_ids = $user->profile->teams->pluck('id');

        $projects = Project::whereIn('team_id', $team_ids)
            ->where('archived', false)
            ->whereNotNull('deadline')
            ->limit(4)
            ->orderBy('deadline', 'asc')
            ->get();

        return Inertia::render('dashboard/index', [
            'projects' => $projects,
            'tasks' => $user
                ->profile
                ->tasks()
                ->with('project')
                ->get(),
        ]);
    }
}
