<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Project extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'description',
        'deadline',
        'archived',
    ];

    /**
     * The model's default values for attributes.
     *
     * @var array
     */
    protected $attributes = [
        'archived' => false,
    ];

    // /**
    //  * The event map for the model.
    //  *
    //  * @var array<string, string>
    //  */
    // protected $dispatchesEvents = [
    //     'deleting' => ProjectDeleting::class,
    // ];

    /**
     * One to Many (inverse) relationship.
     */
    public function team(): BelongsTo
    {
        return $this->belongsTo(Team::class);
    }

    // /**
    //  * One to Many relationship.
    //  */
    // public function tasks(): HasMany
    // {
    //     return $this->hasMany(Task::class);
    // }
}
