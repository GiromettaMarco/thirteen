<?php

namespace App\Models;

use App\Events\TeamDeleting;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Facades\Auth;

class Team extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
    ];

    /**
     * The event map for the model.
     *
     * @var array<string, string>
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
     */
    public function profiles(): BelongsToMany
    {
        return $this
            ->belongsToMany(Profile::class)
            ->withPivot([
                'admin',
                'can_edit',
                'can_delete',
                'can_edit_members',
                'can_edit_projects',
            ])
            ->withTimestamps();
    }
}
