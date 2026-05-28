<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

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
                'can_edit_members',
                'can_edit_projects',
            ])
            ->withTimestamps();
    }

    /**
     * One to Many relationship
     */
    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class);
    }
}
