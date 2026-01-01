<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\RateLimiter;
use Inertia\Inertia;
use Sliver\Format\FlashMessage;

abstract class ThrottledRequest extends FormRequest
{
    /**
     * Maximum number of attempts.
     */
    public int $maxAttempts;

    /**
     * Decay rate in seconds.
     */
    public int $decaySeconds = 60;

    /**
     * Get the rate limiting throttle key for the request.
     */
    abstract public function throttleKey(): string;

    /**
     * Check for the related rate limiter and in case of failure add a flash
     * message to the Inertia session.
     *
     * @return bool Whether the rate limit has been reached.
     */
    public function limiterReached(): bool
    {
        if (! RateLimiter::tooManyAttempts($this->throttleKey(), $this->maxAttempts)) {
            return false;
        }

        $seconds = RateLimiter::availableIn($this->throttleKey());

        Inertia::flash('toast', new FlashMessage(__('strings.throttle', [
            'seconds' => $seconds,
            'minutes' => ceil($seconds / $this->decaySeconds),
        ]), 'error'));

        return true;
    }

    /**
     * Reset the related rate limiter.
     */
    public function limiterClear(): void
    {
        RateLimiter::clear($this->throttleKey());
    }

    /**
     * Increase the rate limiter count and flash a message to the Inertia
     * session if provided.
     */
    public function limiterHit(?FlashMessage $message = null): void
    {
        RateLimiter::hit($this->throttleKey(), $this->decaySeconds);

        if (! is_null($message)) {
            Inertia::flash('toast', $message);
        }
    }
}
