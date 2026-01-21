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
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function resolveRouteBinding($id, $field = null)
    {
        $user = Auth::user();

        if ($user instanceof User) {
            return $user->teams()->findOrFail($id);
        }

        abort(401, 'Unauthenticated.');
    }

    /**
     * Many to Many relationship.
     */
    public function users(): BelongsToMany
    {
        return $this
            ->belongsToMany(User::class)
            ->withPivot([
                'admin',
                'can_edit',
                'can_delete',
            ])
            ->withTimestamps();
    }

    // /**
    //  * One to Many relationship
    //  */
    // public function projects(): HasMany
    // {
    //     return $this->hasMany(Project::class);
    // }

    // /**
    //  * One to Many polymorphic relationship.
    //  */
    // public function views(): MorphMany
    // {
    //     return $this->morphMany(View::class, 'viewable');
    // }

    // /**
    //  * Query for the related projects view.
    //  */
    // public function projectsView(User $user): ?View
    // {
    //     return $this
    //         ->views()
    //         ->where('user_id', $user->id)
    //         ->where('items', 'projects')
    //         ->first();
    // }

    // /**
    //  * Query for the related users view.
    //  */
    // public function usersView(User $user): ?View
    // {
    //     return $this
    //         ->views()
    //         ->where('user_id', $user->id)
    //         ->where('items', 'users')
    //         ->first();
    // }

    // /**
    //  * Get all views for the user.
    //  *
    //  * @return array{projects:?View, users:?View}
    //  */
    // public function getViews(User $user)
    // {
    //     $this->loadMissing(['views' => function ($query) use ($user) {
    //         $query->where('user_id', $user->id);
    //     }]);

    //     return [
    //         'projects' => $this->views->firstWhere('items', 'projects'),
    //         'users' => $this->views->firstWhere('items', 'users'),
    //     ];
    // }
}
