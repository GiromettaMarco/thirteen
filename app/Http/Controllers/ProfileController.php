<?php

namespace App\Http\Controllers;

use App\Enums\TaskStatus;
use App\Http\Requests\UpdateProfileRequest;
use App\Models\Profile;
use App\Models\Task;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Sliver\Format\FlashMessage;

class ProfileController extends Controller
{
    /**
     * Display the profile page.
     */
    public function show(Request $request, Profile $profile): Response
    {
        /** @var User */
        $user = $request->user();

        $profile->loadCount('teams');

        $tasks = $profile->tasks()->get(['status']);

        $tasks_count = [
            'total' => 0,
            'todo' => 0,
            'in_progress' => 0,
            'done' => 0,
        ];

        // Count tasks by status
        $tasks->each(function (Task $task) use (&$tasks_count) {
            $tasks_count['total']++;

            switch ($task->status) {
                case TaskStatus::Done:
                    $tasks_count['done']++;
                    break;

                case TaskStatus::InProgress:
                    $tasks_count['in_progress']++;
                    break;

                case TaskStatus::Todo:
                    $tasks_count['todo']++;
                    break;

                default:
                    break;
            }
        });

        return Inertia::render('dashboard/profile', [
            'canEdit' => $user->can('update', $profile),
            'email' => $user->email,
            'profile' => $profile,
            'tasksCount' => $tasks_count,
        ]);
    }

    /**
     * Update profile data.
     */
    public function update(UpdateProfileRequest $request, Profile $profile): RedirectResponse
    {
        $profile->update($request->validated());

        Inertia::flash('toast', new FlashMessage(__('strings.profile.updated'), 'success'));

        return back();
    }
}
