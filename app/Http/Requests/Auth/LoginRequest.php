<?php

namespace App\Http\Requests\Auth;

use App\Http\Requests\ThrottledRequest;
use Illuminate\Auth\Events\Lockout;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Sliver\Format\FlashMessage;

class LoginRequest extends ThrottledRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

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
     * Attempt to authenticate the request's credentials and add a flash message
     * to the Inertia session in case of error.
     *
     * @return bool `true` on success, `false` otherwise.
     */
    public function authenticate(): bool
    {
        // Rate limiter
        if ($this->limiterReached()) {
            event(new Lockout($this));

            return false;
        }

        // Authenticate
        if (Auth::attempt($this->only('email', 'password'), $this->boolean('remember'))) {
            $this->limiterClear();

            return true;
        }

        // Failed
        $this->limiterHit(new FlashMessage(__('strings.auth.failed'), 'error'));

        return false;
    }
}
