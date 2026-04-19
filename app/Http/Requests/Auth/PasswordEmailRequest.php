<?php

namespace App\Http\Requests\Auth;

use App\Http\Requests\ThrottledRequest;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class PasswordEmailRequest extends ThrottledRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Config::get('custom.auth.reset');
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
     * @return array
     */
    public function rules()
    {
        return ['email' => ['required', 'email']];
    }

    /**
     * Get the rate limiting throttle key for the request.
     */
    public function throttleKey(): string
    {
        return 'password-email|'.$this->ip();
    }

    /**
     * Maximum number of attempts.
     */
    public int $maxAttempts = 1;

    /**
     * Decay rate in seconds.
     */
    public int $decaySeconds = 120;

    /**
     * Attempt to send a password reset link to the authenticated user.
     *
     * @throws ValidationException
     */
    public function sendLink()
    {
        $this->ensureIsNotRateLimited();

        $status = Password::sendResetLink($this->only('email'));

        if ($status == Password::RESET_LINK_SENT || $status == Password::INVALID_USER) {
            $this->limiterHit();
        } else {
            $this->limiterHit(__($status));
        }
    }
}
