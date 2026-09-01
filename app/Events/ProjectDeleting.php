<?php

namespace App\Events;

use App\Models\Project;
use Illuminate\Foundation\Events\Dispatchable;

class ProjectDeleting
{
    use Dispatchable;

    /**
     * Create a new event instance.
     */
    public function __construct(public Project $project) {}
}
