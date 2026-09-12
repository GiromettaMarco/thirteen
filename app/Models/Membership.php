<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\Pivot;

/**
 * @property-read Profile $profile
 * @property-read Team $team
 */
class Membership extends Pivot
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'profile_team';

    /**
     * Indicates if the IDs are auto-incrementing.
     *
     * @var bool
     */
    public $incrementing = true;

    /**
     * Get the attributes that should be cast.
     */
    protected function casts(): array
    {
        return [
            'admin' => 'boolean',
            'can_delete_team' => 'boolean',
            'can_edit_members' => 'boolean',
            'can_edit_projects' => 'boolean',
            'can_edit_team' => 'boolean',
        ];
    }

    /**
     * Get the profile that belongs to this membership.
     *
     * @return BelongsTo<Profile, $this>
     */
    public function profile(): BelongsTo
    {
        return $this->belongsTo(Profile::class);
    }

    /**
     * Get the team that the membership belongs to.
     *
     * @return BelongsTo<Team, $this>
     */
    public function team(): BelongsTo
    {
        return $this->belongsTo(Team::class);
    }
}
