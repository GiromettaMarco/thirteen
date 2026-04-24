<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreViewRequest;
use App\Models\User;
use App\Models\View;
use Illuminate\Http\JsonResponse;

class ViewController extends Controller
{
    /**
     * Store view data.
     */
    public function store(StoreViewRequest $request): JsonResponse
    {
        $validated = $request->validated();

        /** @var User */
        $user = $request->user();

        /** @var View|null */
        $view = $user->views()->where([
            ['page', $validated['page']],
            ['table', $validated['table']],
        ])->first();

        if ($view) {
            // Update existing view
            $view->update($validated);
            $view->save();
        } else {
            // Create a new view
            $user->views()->create($validated);
        }

        return response()->json(null);
    }
}
