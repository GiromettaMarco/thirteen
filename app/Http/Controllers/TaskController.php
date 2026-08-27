<?php

namespace App\Http\Controllers;

use App\Http\Requests\Task\DestroyTasksRequest;
use App\Http\Requests\Task\StoreTaskRequest;
use App\Models\Project;
use App\Models\Task;
use App\Models\Team;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Sliver\Format\FlashMessage;

class TaskController extends Controller
{
    /**
     * Store a new task.
     */
    public function store(
        StoreTaskRequest $request,
        Team $team,
        Project $project
    ): RedirectResponse {
        $project->tasks()->create($request->validated());

        Inertia::flash('toast', new FlashMessage(__('strings.task.created'), 'success'));

        return back();
    }

    /**
     * Update an existing task.
     */
    public function update(
        StoreTaskRequest $request,
        Team $team,
        Project $project,
        Task $task
    ): RedirectResponse {
        $task->update($request->validated());

        Inertia::flash('toast', new FlashMessage(__('strings.task.updated'), 'success'));

        return back();
    }

    /**
     * Delete a task.
     */
    public function destroy(
        Request $request,
        Team $team,
        Project $project,
        Task $task
    ): RedirectResponse {
        $task->delete();

        Inertia::flash('toast', new FlashMessage(__('strings.task.deleted'), 'success'));

        return back();
    }

    /**
     * Delete many resources at once.
     */
    public function destroyMany(
        DestroyTasksRequest $request,
        Team $team,
        Project $project
    ): RedirectResponse {
        /** @var array<int> $ids */
        $ids = $request->validated('ids');

        $tasks = $project->tasks->filter(function (Task $task) use ($ids) {
            return in_array($task->id, $ids);
        });

        // Delete all in one transaction
        DB::transaction(function () use ($tasks) {
            $tasks->each(function (Task $task) {
                $task->delete();
            });
        });

        return back();
    }
}
