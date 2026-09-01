<?php

namespace App\Listeners;

use App\Events\ProjectDeleting;
use App\Models\View;

class DeleteProjectViews
{
    /**
     * Create the event listener.
     */
    public function __construct() {}

    /**
     * Handle the event.
     */
    public function handle(ProjectDeleting $event): void
    {
        // Delete views but skip model events
        View::where('page', 'projects.show/'.$event->project->id)->delete();
    }
}
