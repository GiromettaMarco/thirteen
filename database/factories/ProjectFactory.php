<?php

namespace Database\Factories;

use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        return [
            // @phpstan-ignore argument.type (missing generic)
            'name' => ucwords(fake()->words(2, true)),
            'deadline' => fake()->dateTimeBetween('-1 days', '+30 days'),
        ];
    }
}
