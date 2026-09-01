<?php

namespace App\Http\Controllers;

use App\Http\Requests\SearchProfileRequest;
use Illuminate\Database\Query\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class SearchProfileController extends Controller
{
    public function __invoke(SearchProfileRequest $request): JsonResponse
    {
        $search = '%'.$request->validated('s').'%';

        $users = DB::table('profiles')
            ->join('users', 'users.id', '=', 'profiles.user_id')
            ->where('profiles.public', '=', true)
            ->where(function (Builder $query) use ($search) {
                $query->whereLike('profiles.name', $search)
                    ->orWhereLike('users.email', $search);
            })
            ->select([
                'profiles.id as id',
                'profiles.name as name',
                'users.email as email',
            ])
            ->get();

        return response()->json($users);
    }
}
