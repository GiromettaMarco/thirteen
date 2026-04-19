<?php

namespace App\Http\Requests\Auth;

use App\Http\Requests\ThrottledRequest;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\ValidationException;

class RegisterRequest extends ThrottledRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Config::get('custom.auth.register');
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
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'email',
                'max:255',
            ],
            'password' => ['required', Password::default(), 'confirmed'],
        ];
    }

    /**
     * Get the rate limiting throttle key for the request.
     */
    public function throttleKey(): string
    {
        return 'register|'.$this->ip();
    }

    /**
     * Maximum number of attempts.
     */
    public int $maxAttempts = 1;

    /**
     * Ensure the request is not rate limited.
     *
     * Check rate limiter for both 'register' and 'register-email'.
     *
     * @throws ValidationException
     */
    public function ensureIsNotRateLimited(?callable $callback = null): void
    {
        parent::ensureIsNotRateLimited($callback);

        $throttle_key = 'register-email|'.$this->ip();

        if (! RateLimiter::tooManyAttempts($throttle_key, 2)) {
            return;
        }

        if (! is_null($callback)) {
            $callback();
        }

        $seconds = RateLimiter::availableIn($throttle_key);

        throw ValidationException::withMessages([
            'root' => __('strings.throttle', [
                'seconds' => $seconds,
                'minutes' => ceil($seconds / 60),
            ]),
        ]);
    }

    /**
     * Attempt to register a new user with the provided input.
     *
     * @throws ValidationException
     */
    public function register()
    {
        $this->ensureIsNotRateLimited();

        $validator = Validator::make($this->all(), [
            'email' => Rule::unique(User::class),
        ]);

        if ($validator->fails()) {
            RateLimiter::hit('register-email|'.$this->ip());

            throw ValidationException::withMessages([
                'email' => __('strings.auth.email_taken'),
            ]);
        }

        $user = User::create([
            'email' => $this->validated('email'),
            'password' => Hash::make($this->validated('password')),
        ]);

        $user->profile()->create([
            'name' => $this->validated('name'),
        ]);

        event(new Registered($user));

        Auth::login($user);

        $this->limiterHit();
    }
}
