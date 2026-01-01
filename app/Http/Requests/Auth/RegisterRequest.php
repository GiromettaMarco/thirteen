<?php

namespace App\Http\Requests\Auth;

use App\Http\Requests\ThrottledRequest;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;
use Sliver\Format\FlashMessage;

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
                Rule::unique(User::class),
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
    public int $maxAttempts = 5;

    /**
     * Attempt to register a new user with the provided input and add a flash
     * message to the Inertia session.
     *
     * @return bool `true` on success, `false` otherwise.
     */
    public function register()
    {
        // Rate limiter
        if ($this->limiterReached()) {
            return false;
        }

        // Register
        $user = User::create([
            'name' => $this->validated('name'),
            'email' => $this->validated('email'),
            'password' => Hash::make($this->validated('password')),
        ]);

        event(new Registered($user));

        Auth::login($user);

        // Increase limiter
        $this->limiterHit(new FlashMessage(__('strings.auth.registered'), 'success'));

        return true;
    }
}
