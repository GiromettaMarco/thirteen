<?php

namespace Database\Factories;

use App\Enums\TaskLabel;
use App\Enums\TaskPriority;
use App\Enums\TaskStatus;
use App\Models\Task;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Task>
 */
class TaskFactory extends Factory
{
    protected function getRandomLabel(): ?TaskLabel
    {
        $cases = TaskLabel::cases();

        $count = count($cases);
        $seed = rand(0, $count);

        if ($seed == $count) {
            return null;
        }

        return $cases[$seed];
    }

    protected function getRandomStatus(): TaskStatus
    {
        $seed = rand(0, 10);

        switch ($seed) {
            case 0:
            case 1:
            case 2:
                return TaskStatus::Todo;

            case 3:
            case 4:
            case 5:
                return TaskStatus::InProgress;

            case 6:
            case 7:
            case 8:
                return TaskStatus::Done;

            case 9:
                return TaskStatus::Backlog;

            case 10:
            default:
                return TaskStatus::Canceled;
        }
    }

    protected function getRandomPriority(): TaskPriority
    {
        $cases = TaskPriority::cases();

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
            'label' => $this->getRandomLabel(),
            // @phpstan-ignore argument.type (missing generic)
            'name' => ucwords(fake()->words(rand(2, 10), true)),
            'priority' => $this->getRandomPriority(),
            'status' => $this->getRandomStatus(),
        ];
    }
}
