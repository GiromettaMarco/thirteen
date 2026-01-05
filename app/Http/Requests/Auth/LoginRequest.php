<?php

namespace App\Http\Requests\Auth;

use App\Http\Requests\ThrottledRequest;
use Illuminate\Auth\Events\Lockout;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class LoginRequest extends ThrottledRequest
{
    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        $this->merge([
            'email' => Str::lower($this->email),
        ]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ];
    }

    /**
     * Maximum number of attempts.
     */
    public int $maxAttempts = 5;

    /**
     * Get the rate limiting throttle key for the request.
     */
    public function throttleKey(): string
    {
        return Str::transliterate(Str::lower($this->string('email')).'|'.$this->ip());
    }

    /**
     * Attempt to authenticate the request's credentials.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function authenticate(): void
    {
        $this->ensureIsNotRateLimited(function () {
            event(new Lockout($this));
        });

        if (! Auth::attempt($this->only('email', 'password'), $this->boolean('remember'))) {
            $this->limiterHit(__('strings.auth.failed'));
        }

        $this->limiterClear();
    }
}
