<?php

namespace App\Http\Requests\Auth;

use App\Http\Requests\ThrottledRequest;
use Illuminate\Support\Facades\Config;
use Illuminate\Validation\ValidationException;

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
        return 'verification-send|'.$this->user()?->id;
    }

    /**
     * Maximum number of attempts.
     */
    public int $maxAttempts = 2;

    /**
     * Send an email verification notification to the user.
     *
     * @throws ValidationException
     */
    public function sendEmail(): void
    {
        $this->ensureIsNotRateLimited();

        $this->user()?->sendEmailVerificationNotification();

        $this->limiterHit();
    }
}
