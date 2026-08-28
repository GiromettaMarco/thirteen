<?php

namespace App\Models;

use App\Events\TeamDeleting;
use Database\Factories\TeamFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Auth;

#[Fillable(['name'])]
class Team extends Model
{
    /** @use HasFactory<TeamFactory> */
    use HasFactory;

    /**
     * The event map for the model.
     */
    protected $dispatchesEvents = [
        'deleting' => TeamDeleting::class,
    ];

    /**
     * Retrieve the model for a bound value.
     *
     * @param  int  $id
     * @param  string|null  $field
     * @return Model|null
     */
    public function resolveRouteBinding($id, $field = null)
    {
        $user = Auth::user();

        if ($user instanceof User) {
            return $user->profile->teams()->findOrFail($id);
        }

        abort(401, 'Unauthenticated.');
    }

    /**
     * Many to Many relationship.
     *
     * @return BelongsToMany<Profile, $this, Membership, 'pivot'>
     */
    public function profiles(): BelongsToMany
    {
        return $this
            ->belongsToMany(Profile::class)
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
     * @return HasMany<Project, $this>
     */
    public function projects(): HasMany
    {
        return $this->hasMany(Project::class);
    }
}
