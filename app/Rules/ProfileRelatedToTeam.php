<?php

namespace App\Rules;

use App\Models\Team;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Translation\PotentiallyTranslatedString;

/**
 * Validate that an attribute is an array of task ids related to a project.
 */
class ProfileRelatedToTeam implements ValidationRule
{
    /**
     * The related project.
     *
     * @var Team
     */
    protected $team;

    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct(Team $team)
    {
        $this->team = $team->loadMissing('profiles');
    }

    /**
     * Run the validation rule.
     *
     * @param  Closure(string, ?string=): PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (! $this->team->profiles->contains($value)) {
            $fail('validation.related.profile_to_team')->translate();
        }
    }
}
