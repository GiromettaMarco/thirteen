<?php

namespace App\Listeners;

use App\Models\Invitation;
use Illuminate\Auth\Events\PasswordReset;

class DeleteInvitation
{
    /**
     * Create the event listener.
     */
    public function __construct() {}

    /**
     * Handle the event.
     */
    public function handle(PasswordReset $event): void
    {
        /** @var Invitation | null */
        $invitation = $event->user->invitation;

        if ($invitation) {
            $invitation->delete();
        }
    }
}
