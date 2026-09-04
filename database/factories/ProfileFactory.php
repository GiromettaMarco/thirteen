<?php

namespace Database\Factories;

use App\Enums\ProfileRole;
use App\Models\Profile;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Profile>
 */
class ProfileFactory extends Factory
{
    protected static function getRandomRole(): ProfileRole
    {
        $cases = ProfileRole::cases();

        return $cases[rand(0, count($cases) - 1)];
    }

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        return [
            'name' => fake()->name(),
            'public' => true,
            'role' => self::getRandomRole(),
        ];
    }
}
