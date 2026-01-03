<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class InvitationController extends Controller
{
    /**
     * Show all invitations.
     */
    public function index(Request $request): Response
    {
        return Inertia::render('dashboard/invitations/index');
    }
}
