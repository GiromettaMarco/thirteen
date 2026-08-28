<?php

namespace App\Models;

use App\Enums\ProfileRole;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property-read User $user
 */
#[Fillable(['name', 'public', 'role'])]
class Profile extends Model
{
    /**
     * Get the attributes that should be cast.
     */
    protected function casts(): array
    {
        return [
            'role' => ProfileRole::class,
        ];
    }

    /**
     * One to One (inverse) relationship.
     *
     * @return BelongsTo<User, $this>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Many to Many relationship.
     *
     * @return BelongsToMany<Team, $this, Membership, 'pivot'>
     */
    public function teams(): BelongsToMany
    {
        return $this
            ->belongsToMany(Team::class)
            ->using(Membership::class)
            ->withPivot([
                'admin',
                'can_delete_team',
                'can_edit_members',
                'can_edit_projects',
                'can_edit_team',
            ])
            ->withTimestamps();
    }

    /**
     * One to Many relationship
     *
     * @return HasMany<Task, $this>
     */
    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class);
    }
}
