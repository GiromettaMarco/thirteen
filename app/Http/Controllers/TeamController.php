<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TeamController extends Controller
{
    /**
     * Show teams related to the current user.
     */
    public function index(Request $request): Response
    {
        return Inertia::render('dashboard/teams/index');
    }

    /**
     * Show the team with related projects and users.
     */
    public function show(Request $request): Response
    {
        return Inertia::render('dashboard/teams/show');
    }
}
