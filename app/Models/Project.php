<?php

namespace App\Models;

use App\Events\ProjectDeleting;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property-read Team $team
 */
#[Fillable(['name', 'description', 'archived', 'deadline'])]
class Project extends Model
{
    /**
     * The model's default values for attributes.
     */
    protected $attributes = [
        'archived' => false,
    ];

    /**
     * The event map for the model.
     */
    protected $dispatchesEvents = [
        'deleting' => ProjectDeleting::class,
    ];

    /**
     * One to Many (inverse) relationship.
     *
     * @return BelongsTo<Team, $this>
     */
    public function team(): BelongsTo
    {
        return $this->belongsTo(Team::class);
    }

    /**
     * One to Many relationship.
     *
     * @return HasMany<Task, $this>
     */
    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class);
    }
}
