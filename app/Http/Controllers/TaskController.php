<?php

namespace App\Http\Controllers;

use App\Enums\TaskPriority;
use App\Enums\TaskStatus;
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
        $project->tasks()->create(
            array_merge([
                'priority' => TaskPriority::Medium->value,
                'status' => TaskStatus::Todo->value,
            ], $request->validated())
        );

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

        // Delete all in one transaction
        DB::transaction(function () use ($ids, $project) {
            $project->tasks->each(function (Task $task) use ($ids) {
                if (in_array($task->id, $ids)) {
                    $task->delete();
                }
            });
        });

        Inertia::flash('toast', new FlashMessage(__('strings.task.deleted_many'), 'success'));

        return back();
    }
}
