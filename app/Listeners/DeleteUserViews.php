<?php

namespace App\Listeners;

use App\Events\UserDeleting;
use App\Models\View;

class DeleteUserViews
{
    /**
     * Create the event listener.
     */
    public function __construct() {}

    /**
     * Handle the event.
     */
    public function handle(UserDeleting $event): void
    {
        // Delete views but skip model events
        View::where('user_id', $event->user->id)->delete();
    }
}
