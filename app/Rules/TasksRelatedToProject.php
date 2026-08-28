<?php

namespace App\Rules;

use App\Models\Project;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Translation\PotentiallyTranslatedString;

class TasksRelatedToProject implements ValidationRule
{
    /**
     * The related project.
     *
     * @var Project
     */
    protected $project;

    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct(Project $project)
    {
        $this->project = $project->loadMissing('tasks');
    }

    /**
     * Run the validation rule.
     *
     * @param  Closure(string, ?string=): PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        foreach ($value as $id) {
            if (! $this->project->tasks->contains($id)) {
                $fail('validation.related.tasks_to_project')->translate();
            }
        }
    }
}
