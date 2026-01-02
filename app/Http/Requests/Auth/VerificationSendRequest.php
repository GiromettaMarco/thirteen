<?php

namespace App\Http\Requests\Auth;

use App\Http\Requests\ThrottledRequest;
use Illuminate\Support\Facades\Config;
use Sliver\Format\FlashMessage;

class VerificationSendRequest extends ThrottledRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Config::get('custom.auth.verification');
    }

    /**
     * Get the rate limiting throttle key for the request.
     */
    public function throttleKey(): string
    {
        return 'verification-send|'.$this->user()->id;
    }

    /**
     * Maximum number of attempts.
     */
    public int $maxAttempts = 2;

    /**
     * Attempt to register a new user with the provided input and add a flash
     * message to the Inertia session.
     *
     * @return bool `true` on success, `false` otherwise.
     */
    public function sendEmail()
    {
        // Rate limiter
        if ($this->limiterReached()) {
            return false;
        }

        $this->user()->sendEmailVerificationNotification();

        // Increase limiter
        $this->limiterHit(new FlashMessage([
            'title' => __('strings.email_sent'),
            'description' => __('strings.auth.verify_email'),
            'level' => 'success',
        ]));

        return true;
    }
}
