<?php

namespace Database\Factories;

use App\Enums\TaskLabel;
use App\Enums\TaskPriority;
use App\Enums\TaskStatus;
use App\Models\Profile;
use App\Models\Task;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Task>
 */
class TaskFactory extends Factory
{
    protected static ?string $profile_id;

    public function withProfile(string|int|Profile $profile): TaskFactory
    {
        static::$profile_id = (string) ($profile instanceof Profile ? $profile->id : $profile);

        return $this;
    }

    /**
     * @return string|null
     */
    protected function getRandomLabel()
    {
        $cases = TaskLabel::cases();

        $count = count($cases);
        $seed = rand(0, $count);

        if ($seed == $count) {
            return null;
        }

        return $cases[$seed]->value;
    }

    /**
     * @return string
     */
    protected function getRandomStatus()
    {
        $seed = rand(0, 10);

        switch ($seed) {
            case 0:
            case 1:
            case 2:
                return TaskStatus::Todo->value;

            case 3:
            case 4:
            case 5:
                return TaskStatus::InProgress->value;

            case 6:
            case 7:
            case 8:
                return TaskStatus::Done->value;

            case 9:
                return TaskStatus::Backlog->value;

            case 10:
            default:
                return TaskStatus::Canceled->value;
        }
    }

    /**
     * @return string
     */
    protected function getRandomPriority()
    {
        $cases = TaskPriority::cases();

        return $cases[rand(0, count($cases) - 1)]->value;
    }

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        return [
            'label' => $this->getRandomLabel(),
            // @phpstan-ignore argument.type (missing generic)
            'name' => ucwords(fake()->words(2, true)),
            'priority' => $this->getRandomPriority(),
            'profile_id' => static::$profile_id,
            'status' => $this->getRandomStatus(),
        ];
    }
}
