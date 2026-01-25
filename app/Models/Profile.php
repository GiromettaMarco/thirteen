<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Profile extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'public',
        'role',
    ];

    /**
     * One to One (inverse) relationship.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Many to Many relationship.
     */
    public function teams(): BelongsToMany
    {
        return $this
            ->belongsToMany(Team::class)
            ->withPivot([
                'admin',
                'can_edit',
                'can_delete',
                'can_add_members',
                'can_edit_members',
                'can_remove_members',
            ])
            ->withTimestamps();
    }
}
