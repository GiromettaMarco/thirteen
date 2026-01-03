<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    /**
     * Show all related projects.
     */
    public function index(Request $request): Response
    {
        return Inertia::render('dashboard/projects/index');
    }
}
