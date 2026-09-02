<?php

namespace App\Http\Controllers;

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
        $total = 0;
        $done = 0;
        $in_progress = 0;
        $todo = 0;

        // Count tasks by status
        $tasks->each(function (Task $task) use (&$total, &$done, &$in_progress, &$todo) {
            $total++;

            switch ($task->status) {
                case 'done':
                    $done++;
                    break;

                case 'in_progress':
                    $in_progress++;
                    break;

                case 'todo':
                    $todo++;
                    break;

                default:
                    break;
            }
        });

        return Inertia::render('dashboard/profile', [
            'canEdit' => $user->can('update', $profile),
            'email' => $user->email,
            'profile' => $profile,
            'tasksCount' => [
                'done' => $done,
                'inProgress' => $in_progress,
                'todo' => $todo,
                'total' => $total,
            ],
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
