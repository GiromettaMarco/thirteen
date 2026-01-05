<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Validation\ValidationException;

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
     * Ensure the request is not rate limited.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function ensureIsNotRateLimited(?callable $callback = null): void
    {
        if (! RateLimiter::tooManyAttempts($this->throttleKey(), $this->maxAttempts)) {
            return;
        }

        if (! is_null($callback)) {
            $callback();
        }

        $seconds = RateLimiter::availableIn($this->throttleKey());

        throw ValidationException::withMessages([
            'root' => __('strings.throttle', [
                'seconds' => $seconds,
                'minutes' => ceil($seconds / $this->decaySeconds),
            ]),
        ]);
    }

    /**
     * Reset the related rate limiter.
     */
    public function limiterClear(): void
    {
        RateLimiter::clear($this->throttleKey());
    }

    /**
     * Increase the rate limiter count and throw a validation exception if a
     * message is provided.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function limiterHit(?string $message = null): void
    {
        RateLimiter::hit($this->throttleKey(), $this->decaySeconds);

        if (! is_null($message)) {
            throw ValidationException::withMessages([
                'root' => $message,
            ]);
        }
    }
}
