<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends Factory<User>
 */
class UserFactory extends Factory
{
    /**
     * The profile name being used by the factory.
     */
    protected static ?string $name;

    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * The profile privacy being used by the factory.
     */
    protected static ?bool $public;

    /**
     * The profile role being used by the factory.
     */
    protected static ?string $role;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
        ];
    }

    /**
     * Add a related profile model.
     */
    public function withProfile(
        string $name,
        string $role = 'guest',
        bool $public = false
    ): UserFactory {
        static::$name = $name;
        static::$public = $public;

        if (in_array($role, Config::get('custom.roles'))) {
            static::$role = $role;
        }

        return $this;
    }

    /**
     * Configure the model factory.
     */
    public function configure(): static
    {
        return $this->afterCreating(function (User $user) {
            $user->profile()->create([
                'name' => static::$name ??= fake()->name(),
                'public' => static::$public ??= false,
                'role' => static::$role ??= 'guest',
            ]);
        });
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
